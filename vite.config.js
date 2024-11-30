import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/images": "https://lh3.googleusercontent.com/",
  },
  // https://lh3.googleusercontent.com/
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
  optimizeDeps: {
    include: ["@react-oauth/google"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-oauth": ["@react-oauth/google"],
        },
      },
    },
  },
});
