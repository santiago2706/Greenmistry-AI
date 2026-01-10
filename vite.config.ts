import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@core': resolve(__dirname, './src/core'),
            '@modules': resolve(__dirname, './src/modules'),
            '@design-system': resolve(__dirname, './src/design-system'),
            '@shared': resolve(__dirname, './src/shared'),
            '@store': resolve(__dirname, './src/store'),
            '@router': resolve(__dirname, './src/router'),
            '@styles': resolve(__dirname, './src/styles'),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
});
