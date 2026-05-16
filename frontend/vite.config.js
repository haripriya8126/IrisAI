import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy /api to Flask during development so fetch("/api/...") works
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
      },
    },
  },
});
