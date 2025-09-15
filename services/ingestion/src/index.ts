import { PipelineRecord } from "cloudflare:pipelines";
import { ungzip } from "pako";

// CORS headers for cross-origin requests
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Content-Encoding, Authorization',
	'Access-Control-Max-Age': '86400', // 24 hours
};

// Helper function to create responses with CORS headers
const createCorsResponse = (body: string | null, options: { status: number }) => {
	return new Response(body, {
		...options,
		headers: corsHeaders,
	});
};

const createCorsJsonResponse = (data: any) => {
	return Response.json(data, { headers: corsHeaders });
};

export default {
	async fetch(request: Request, env, ctx): Promise<Response> {
		// Handle preflight OPTIONS request
		if (request.method === 'OPTIONS') {
			return createCorsResponse(null, { status: 204 });
		}

		if (request.method !== 'POST') {
			return createCorsResponse('Method Not Allowed', { status: 405 });
		}

		try {
			let body;

			// Check if the content is gzip compressed
			const contentEncoding = request.headers.get('Content-Encoding');
			if (contentEncoding === 'gzip') {
				// Decompress gzipped data
				const compressedData = new Uint8Array(await request.arrayBuffer());
				const decompressedData = ungzip(compressedData, { to: 'string' });
				body = JSON.parse(decompressedData);
				console.log('Received and decompressed gzipped data');
			} else {
				// Handle regular JSON data
				body = await request.json();
				console.log('Received regular JSON data');
			}
			await env.PIPELINE.send(body as PipelineRecord[]);
			return createCorsJsonResponse({ success: true, message: 'Data received and processed' });
		} catch (err) {
			const error = err as Error;
			console.error(`Error processing request: ${error.message}`);
			return createCorsResponse('Error processing request.', { status: 400 });
		}
	},
} satisfies ExportedHandler<Env>;