/// <reference types="vite/client" />
import { record } from "@rrweb/record";
import { getRecordConsolePlugin } from '@rrweb/rrweb-plugin-console-record';
import { gzip } from 'pako';

const INGESTION_URL = import.meta.env.VITE_INGESTION_URL;

// Use original console.log to avoid recording our own logs
const originalLog = (console.log as any)['__rrweb_original__']
    ? (console.log as any)['__rrweb_original__']
    : console.log;

// Only log in development mode
const defaultLog = import.meta.env.DEV ? originalLog : () => { };
const MAX_PAYLOAD_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const BATCH_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay
const SESSION_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

interface EventBatch {
    id: string;
    events: any[];
    createdAt: number;
    retryCount: number;
    sessionId: string;
}

interface SessionInfo {
    id: string;
    startTime: number;
    expiryTime: number;
}

interface EventState {
    currentBatch: EventBatch | null;
    pendingBatches: EventBatch[];
    batchTimer: number | null;
    isOnline: boolean;
    isProcessing: boolean;
    session: SessionInfo | null;
    recorder: any;
}

// State management
let state: EventState = {
    currentBatch: null,
    pendingBatches: [],
    batchTimer: null,
    isOnline: navigator.onLine,
    isProcessing: false,
    session: null,
    recorder: null
};

// Session management functions
const createSession = (): SessionInfo => {
    const now = Date.now();
    return {
        id: crypto.randomUUID(),
        startTime: now,
        expiryTime: now + SESSION_DURATION
    };
};

const isSessionExpired = (session: SessionInfo | null): boolean => {
    if (!session) return true;
    return Date.now() >= session.expiryTime;
};

const saveSessionToStorage = async (session: SessionInfo): Promise<void> => {
    try {
        const database = await initDB();
        const transaction = database.transaction([SESSIONS_STORE], 'readwrite');
        const store = transaction.objectStore(SESSIONS_STORE);

        await new Promise<void>((resolve, reject) => {
            const request = store.put(session);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });

        defaultLog(`Saved session ${session.id} to IndexedDB`);
    } catch (error) {
        console.warn('Failed to save session to IndexedDB, falling back to localStorage:', error);
        // Fallback to localStorage
        try {
            localStorage.setItem('skywatch-session', JSON.stringify(session));
        } catch (fallbackError) {
            console.error('Both IndexedDB and localStorage failed:', fallbackError);
        }
    }
};

const loadSessionFromStorage = async (): Promise<SessionInfo | null> => {
    try {
        const database = await initDB();
        const transaction = database.transaction([SESSIONS_STORE], 'readonly');
        const store = transaction.objectStore(SESSIONS_STORE);

        const sessions = await new Promise<SessionInfo[]>((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });

        // Get the most recent session
        const session = sessions.sort((a, b) => b.startTime - a.startTime)[0] || null;

        if (session) {
            if (!isSessionExpired(session)) {
                defaultLog(`Loaded existing session: ${session.id} from IndexedDB`);
                return session;
            } else {
                defaultLog('Stored session expired, will create new one');
                // Clean up expired session
                const deleteTransaction = database.transaction([SESSIONS_STORE], 'readwrite');
                const deleteStore = deleteTransaction.objectStore(SESSIONS_STORE);
                deleteStore.delete(session.id);
            }
        }
    } catch (error) {
        console.warn('Failed to load session from IndexedDB, falling back to localStorage:', error);
        // Fallback to localStorage
        try {
            const stored = localStorage.getItem('skywatch-session');
            if (stored) {
                const session = JSON.parse(stored);
                if (!isSessionExpired(session)) {
                    defaultLog(`Loaded existing session: ${session.id} from localStorage fallback`);
                    return session;
                } else {
                    defaultLog('Stored session expired, will create new one');
                    localStorage.removeItem('skywatch-session');
                }
            }
        } catch (fallbackError) {
            console.error('Both IndexedDB and localStorage failed:', fallbackError);
        }
    }
    return null;
};

// Compression cache to avoid double compression
const compressionCache = new Map<string, { compressed: Uint8Array; originalSize: number; compressedSize: number }>();

const getCompressedPayload = (batch: EventBatch): { compressed: Uint8Array; originalSize: number; compressedSize: number } => {
    // Create cache key based on batch content
    const cacheKey = `${batch.id}-${batch.events.length}`;

    // Return cached result if available
    if (compressionCache.has(cacheKey)) {
        return compressionCache.get(cacheKey)!;
    }

    // Compress and cache
    const payload = batch.events.map(event => ({
        sessionId: batch.sessionId,
        event: event
    }));
    const jsonString = JSON.stringify(payload);
    const compressed = gzip(jsonString);

    const result = {
        compressed,
        originalSize: new Blob([jsonString]).size,
        compressedSize: compressed.length
    };

    compressionCache.set(cacheKey, result);
    return result;
};

const calculateBatchPayloadSize = (batch: EventBatch): number => {
    return getCompressedPayload(batch).compressedSize;
};

const createBatch = (sessionId: string): EventBatch => ({
    id: crypto.randomUUID(),
    events: [],
    createdAt: Date.now(),
    retryCount: 0,
    sessionId
});

// Pure functions for state manipulation
const addEventToBatch = (state: EventState, event: any): EventState => {
    if (!state.session) return state;

    let updatedBatch: EventBatch;

    // Create new batch if none exists
    if (!state.currentBatch) {
        updatedBatch = {
            ...createBatch(state.session.id),
            events: [event]
        };
    } else {
        // Add event to current batch
        updatedBatch = {
            ...state.currentBatch,
            events: [...state.currentBatch.events, event]
        };
    }

    // Immediately save current batch to prevent data loss
    saveCurrentBatchToStorage(updatedBatch).catch(error => {
        console.error('Failed to save current batch:', error);
    });

    return {
        ...state,
        currentBatch: updatedBatch
    };
};

const finalizeBatch = (state: EventState): EventState => {
    if (!state.currentBatch || state.currentBatch.events.length === 0) {
        return state;
    }

    // Clear the batch timer since we're finalizing
    if (state.batchTimer) {
        clearTimeout(state.batchTimer);
    }

    // Clear current batch from storage since it's being finalized
    saveCurrentBatchToStorage(null).catch(error => {
        console.error('Failed to clear current batch from storage:', error);
    });

    return {
        ...state,
        pendingBatches: [...state.pendingBatches, state.currentBatch],
        currentBatch: null,
        batchTimer: null
    };
};

const getNextBatchToSend = (state: EventState): EventBatch | null => {
    return state.pendingBatches[0] || null;
};

const removeBatchFromPending = (state: EventState, batchId: string): EventState => {
    return {
        ...state,
        pendingBatches: state.pendingBatches.filter(batch => batch.id !== batchId)
    };
};

const requeueBatch = (state: EventState, batch: EventBatch): EventState => {
    if (batch.retryCount >= MAX_RETRIES) {
        defaultLog(`Batch ${batch.id} exceeded retry limit, moving to dead letter queue`);
        // TODO: Move to dead letter queue instead of discarding
        return {
            ...state,
            pendingBatches: state.pendingBatches.filter(b => b.id !== batch.id)
        };
    }

    // Update retry count for existing batch in pending list
    const updatedBatches = state.pendingBatches.map(b =>
        b.id === batch.id
            ? { ...b, retryCount: b.retryCount + 1 }
            : b
    );

    return {
        ...state,
        pendingBatches: updatedBatches
    };
};

// IndexedDB Storage functions
const DB_NAME = 'SkyWatchDB';
const DB_VERSION = 1;
const BATCHES_STORE = 'batches';
const CURRENT_BATCH_STORE = 'currentBatch';
const SESSIONS_STORE = 'sessions';

let db: IDBDatabase | null = null;

const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('Failed to open IndexedDB:', request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            defaultLog('IndexedDB initialized successfully');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBOpenDBRequest).result;

            // Create batches store
            if (!database.objectStoreNames.contains(BATCHES_STORE)) {
                const batchStore = database.createObjectStore(BATCHES_STORE, { keyPath: 'id' });
                batchStore.createIndex('sessionId', 'sessionId', { unique: false });
                batchStore.createIndex('createdAt', 'createdAt', { unique: false });
            }

            // Create current batch store (single record)
            if (!database.objectStoreNames.contains(CURRENT_BATCH_STORE)) {
                database.createObjectStore(CURRENT_BATCH_STORE, { keyPath: 'id' });
            }

            // Create sessions store
            if (!database.objectStoreNames.contains(SESSIONS_STORE)) {
                database.createObjectStore(SESSIONS_STORE, { keyPath: 'id' });
            }

            defaultLog('IndexedDB stores created');
        };
    });
};

const saveBatchesToStorage = async (batches: EventBatch[]): Promise<void> => {
    try {
        const database = await initDB();
        const transaction = database.transaction([BATCHES_STORE], 'readwrite');
        const store = transaction.objectStore(BATCHES_STORE);

        // Clear existing batches and add new ones
        await new Promise<void>((resolve, reject) => {
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = () => reject(clearRequest.error);
        });

        // Add all batches
        for (const batch of batches) {
            await new Promise<void>((resolve, reject) => {
                const addRequest = store.add(batch);
                addRequest.onsuccess = () => resolve();
                addRequest.onerror = () => reject(addRequest.error);
            });
        }

        defaultLog(`Saved ${batches.length} batches to IndexedDB`);
    } catch (error) {
        console.warn('Failed to save batches to IndexedDB, falling back to localStorage:', error);
        // Fallback to localStorage
        try {
            localStorage.setItem('skywatch-batches', JSON.stringify(batches));
        } catch (fallbackError) {
            console.error('Both IndexedDB and localStorage failed:', fallbackError);
        }
    }
};

const saveCurrentBatchToStorage = async (batch: EventBatch | null): Promise<void> => {
    try {
        const database = await initDB();
        const transaction = database.transaction([CURRENT_BATCH_STORE], 'readwrite');
        const store = transaction.objectStore(CURRENT_BATCH_STORE);

        // Clear existing current batch
        await new Promise<void>((resolve, reject) => {
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = () => reject(clearRequest.error);
        });

        if (batch) {
            await new Promise<void>((resolve, reject) => {
                const addRequest = store.add(batch);
                addRequest.onsuccess = () => resolve();
                addRequest.onerror = () => reject(addRequest.error);
            });
        }
    } catch (error) {
        console.warn('Failed to save current batch to IndexedDB, falling back to localStorage:', error);
        // Fallback to localStorage
        try {
            if (batch) {
                localStorage.setItem('skywatch-current-batch', JSON.stringify(batch));
            } else {
                localStorage.removeItem('skywatch-current-batch');
            }
        } catch (fallbackError) {
            console.error('Both IndexedDB and localStorage failed:', fallbackError);
        }
    }
};

const loadBatchesFromStorage = async (): Promise<EventBatch[]> => {
    try {
        const database = await initDB();
        const transaction = database.transaction([BATCHES_STORE], 'readonly');
        const store = transaction.objectStore(BATCHES_STORE);

        const batches = await new Promise<EventBatch[]>((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });

        defaultLog(`Loaded ${batches.length} pending batches from IndexedDB`);
        return batches;
    } catch (error) {
        console.warn('Failed to load batches from IndexedDB, falling back to localStorage:', error);
        // Fallback to localStorage
        try {
            const stored = localStorage.getItem('skywatch-batches');
            if (stored) {
                const batches = JSON.parse(stored);
                defaultLog(`Loaded ${batches.length} pending batches from localStorage fallback`);
                return batches;
            }
        } catch (fallbackError) {
            console.error('Both IndexedDB and localStorage failed:', fallbackError);
        }
        return [];
    }
};

const loadCurrentBatchFromStorage = async (): Promise<EventBatch | null> => {
    try {
        const database = await initDB();
        const transaction = database.transaction([CURRENT_BATCH_STORE], 'readonly');
        const store = transaction.objectStore(CURRENT_BATCH_STORE);

        const batches = await new Promise<EventBatch[]>((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });

        const batch = batches[0] || null;
        if (batch) {
            defaultLog(`Loaded current batch ${batch.id} with ${batch.events.length} events from IndexedDB`);
        }
        return batch;
    } catch (error) {
        console.warn('Failed to load current batch from IndexedDB, falling back to localStorage:', error);
        // Fallback to localStorage
        try {
            const stored = localStorage.getItem('skywatch-current-batch');
            if (stored) {
                const batch = JSON.parse(stored);
                defaultLog(`Loaded current batch ${batch.id} with ${batch.events.length} events from localStorage fallback`);
                return batch;
            }
        } catch (fallbackError) {
            console.error('Both IndexedDB and localStorage failed:', fallbackError);
        }
        return null;
    }
};

// Network functions
const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

const sendBatch = async (batch: EventBatch): Promise<void> => {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Get compressed payload (only compress once)
            const { compressed, originalSize, compressedSize } = getCompressedPayload(batch);

            // Calculate compression ratio
            const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

            const response = await fetch(INGESTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/gzip',
                    'Content-Encoding': 'gzip',
                },
                body: compressed
            });

            if (response.ok) {
                // Clean up compression cache for this batch
                compressionCache.delete(`${batch.id}-${batch.events.length}`);
                defaultLog(`Successfully sent batch ${batch.id} with ${batch.events.length} events for session ${batch.sessionId} (${compressionRatio}% compression)`);
                return;
            }

            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        } catch (error) {
            console.warn(`Batch ${batch.id} send attempt ${attempt + 1} failed:`, error);

            if (attempt < MAX_RETRIES) {
                const delayMs = RETRY_DELAY * Math.pow(2, attempt);
                await delay(delayMs);
            } else {
                throw error;
            }
        }
    }
};

// Batch processing functions
const processBatches = async (): Promise<void> => {
    if (!state.isOnline || state.isProcessing) {
        return;
    }

    const batch = getNextBatchToSend(state);
    if (!batch) {
        return;
    }

    state.isProcessing = true;

    const batchSize = calculateBatchPayloadSize(batch);
    defaultLog(`Processing batch ${batch.id} with ${batch.events.length} events (${(batchSize / 1024).toFixed(1)}KB)`);

    try {
        await sendBatch(batch);
        // Only remove batch AFTER successful send
        state = removeBatchFromPending(state, batch.id);
        defaultLog(`Successfully processed and cleared batch ${batch.id} from memory`);
        saveBatchesToStorage(state.pendingBatches).catch(error => {
            console.error('Failed to save batches after successful send:', error);
        });
    } catch (error) {
        console.error(`Failed to send batch ${batch.id}:`, error);
        // Batch is still in pendingBatches, just increment retry count
        state = requeueBatch(state, batch);
        saveBatchesToStorage(state.pendingBatches).catch(saveError => {
            console.error('Failed to save batches after retry:', saveError);
        });
        defaultLog(`Requeued batch ${batch.id} for retry (attempt ${batch.retryCount + 1})`);
    }

    state.isProcessing = false;

    // Continue processing if there are more batches
    if (state.pendingBatches.length > 0) {
        setTimeout(processBatches, 100);
    }
};

const finalizeBatchIfNeeded = (): void => {
    if (!state.currentBatch || state.currentBatch.events.length === 0) {
        return;
    }

    const batchSize = calculateBatchPayloadSize(state.currentBatch);
    const shouldFinalize = batchSize >= MAX_PAYLOAD_SIZE;

    if (shouldFinalize) {
        defaultLog(`Batch size limit reached (${(batchSize / 1024).toFixed(1)}KB), finalizing batch ${state.currentBatch.id}`);
        state = finalizeBatch(state);
        saveBatchesToStorage(state.pendingBatches).catch(error => {
            console.error('Failed to save batches after size finalization:', error);
        });
        processBatches();
    }
};

const scheduleBatchFinalization = (): void => {
    // Only schedule if no timer exists (don't reset existing timer)
    if (state.batchTimer || !state.currentBatch) {
        return;
    }

    // Calculate timeout based on batch creation time, not current time
    const batchAge = Date.now() - state.currentBatch.createdAt;
    const remainingTime = Math.max(0, BATCH_TIMEOUT - batchAge);

    defaultLog(`Scheduling batch finalization in ${remainingTime}ms (batch created ${batchAge}ms ago)`);

    state.batchTimer = window.setTimeout(() => {
        if (state.currentBatch && state.currentBatch.events.length > 0) {
            defaultLog(`Batch timeout reached (${BATCH_TIMEOUT}ms since creation), finalizing batch ${state.currentBatch.id}`);
            state = finalizeBatch(state);
            saveBatchesToStorage(state.pendingBatches).catch(error => {
                console.error('Failed to save batches after timeout finalization:', error);
            });
            processBatches();
        }
    }, remainingTime);
};

// Event handlers
const addEvent = (event: any): void => {
    state = addEventToBatch(state, event);

    if (state.currentBatch) {
        const currentPayloadSize = calculateBatchPayloadSize(state.currentBatch);
        defaultLog(`Event added to batch ${state.currentBatch.id}. Batch size: ${state.currentBatch.events.length} events (${(currentPayloadSize / 1024).toFixed(1)}KB)`);

        // Check if we should finalize based on size limit
        finalizeBatchIfNeeded();

        // Schedule timeout finalization if not already finalized
        if (state.currentBatch) {
            scheduleBatchFinalization();
        }
    }
};

const handleOnline = (): void => {
    defaultLog('Connection restored, resuming batch processing');
    state.isOnline = true;
    processBatches();
};

const handleOffline = (): void => {
    defaultLog('Connection lost, events will be batched');
    state.isOnline = false;
};

const getQueueStatus = () => {
    const currentBatchSize = state.currentBatch ? calculateBatchPayloadSize(state.currentBatch) : 0;
    return {
        currentBatchEvents: state.currentBatch?.events.length || 0,
        currentBatchSizeKB: Math.round(currentBatchSize / 1024),
        pendingBatches: state.pendingBatches.length,
        maxPayloadSizeKB: Math.round(MAX_PAYLOAD_SIZE / 1024),
        isOnline: state.isOnline,
        isProcessing: state.isProcessing,
        sessionId: state.session?.id,
        sessionExpiry: state.session?.expiryTime,
        sessionTimeLeft: state.session ? Math.max(0, state.session.expiryTime - Date.now()) : 0
    };
};

// Recording management functions
const startRecording = async (): Promise<void> => {
    if (state.recorder) {
        defaultLog('Stopping existing recording');
        state.recorder();
        state.recorder = null;
    }

    // Create or get valid session
    if (!state.session || isSessionExpired(state.session)) {
        state.session = createSession();
        await saveSessionToStorage(state.session);
        defaultLog(`Created new session: ${state.session.id}`);
    }

    defaultLog(`Starting recording with session: ${state.session.id}`);
    state.recorder = record({
        emit(event) {
            addEvent(event);
        },
        plugins: [getRecordConsolePlugin()]
    });
};

const stopRecording = (): void => {
    if (state.recorder) {
        defaultLog('Stopping recording');
        state.recorder();
        state.recorder = null;
    }
};

const checkSessionAndRestart = async (): Promise<void> => {
    if (state.session && isSessionExpired(state.session)) {
        defaultLog(`Session ${state.session.id} expired, restarting recording`);
        stopRecording();
        await startRecording();
    }
};

// Initialize
const init = async (): Promise<void> => {
    try {
        // Initialize IndexedDB first
        await initDB();

        // Load data from storage
        state.pendingBatches = await loadBatchesFromStorage();
        state.session = await loadSessionFromStorage();

        // Recover current batch if it exists (crash recovery)
        const recoveredBatch = await loadCurrentBatchFromStorage();
        if (recoveredBatch) {
            // Check if batch belongs to current session, if not finalize it
            if (!state.session || recoveredBatch.sessionId !== state.session.id || isSessionExpired(state.session)) {
                defaultLog(`Finalizing recovered batch ${recoveredBatch.id} from previous session`);
                state.pendingBatches = [...state.pendingBatches, recoveredBatch];
                await saveBatchesToStorage(state.pendingBatches);
                await saveCurrentBatchToStorage(null);
            } else {
                defaultLog(`Restoring current batch ${recoveredBatch.id} with ${recoveredBatch.events.length} events`);
                state.currentBatch = recoveredBatch;
            }
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Periodic batch processing every 30 seconds
        setInterval(() => {
            if (state.pendingBatches.length > 0) {
                processBatches();
            }
        }, 30000);

        // Check session expiry every minute
        setInterval(async () => {
            try {
                await checkSessionAndRestart();
            } catch (error) {
                console.error('Error during session check and restart:', error);
            }
        }, 60000);

        // Start initial recording
        await startRecording();

        // Process any pending batches from storage
        if (state.pendingBatches.length > 0) {
            defaultLog(`Found ${state.pendingBatches.length} pending batches from storage`);
            processBatches();
        }

        defaultLog('SkyWatch recorder initialized successfully');
    } catch (error) {
        console.error('Failed to initialize SkyWatch recorder:', error);
        throw error;
    }
};

// Start the system
init();

// Expose functions for debugging
(window as any).getEventQueueStatus = getQueueStatus;
(window as any).startRecording = startRecording;
(window as any).stopRecording = stopRecording;