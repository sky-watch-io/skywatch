import { defineConfig } from 'vite'
import { resolve } from 'path'
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'recorder',
            fileName: (format) => `recorder.${format}.js`
        },
        minify: true
    },
    plugins: [cloudflare()],
})