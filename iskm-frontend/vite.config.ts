import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        preview: {
            host: "0.0.0.0",
            port: Number(env.PREVIEW_PORT) || 4183,
        },
        server: {
            port: Number(env.DEV_PORT) || 5173,
        },
    };
});
