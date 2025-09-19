"use client"
import { useEffect, useState } from "react";

const LIGHT_THEME = 'retro';
const DARK_THEME = 'dim';

const ThemeDropdown = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', prefersDark ? DARK_THEME : LIGHT_THEME);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', e.matches ? DARK_THEME : LIGHT_THEME);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? DARK_THEME : LIGHT_THEME);
    };

    return (
        <label className="swap btn btn-sm btn-ghost btn-circle">
            {/* this hidden checkbox controls the state */}
            <input
                type="checkbox"
                className="theme-controller"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />

            {/* sun icon */}
            <span className="icon-[lucide--sun] swap-off size-5"></span>

            {/* moon icon */}
            <span className="icon-[lucide--moon-star] swap-on size-5"></span>
        </label>
    );
}

export default ThemeDropdown