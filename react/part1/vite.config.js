import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: "development",
  server: {
    port: 5173, // React app runs on port 3000
    host: "0.0.0.0",
    // https: {
    //   key: fs.readFileSync("./certs/localhost-key.pem"),
    //   cert: fs.readFileSync("./certs/localhost.pem"),
    // },
    https: false,
    proxy: {
      "/api": {
        // Any request starting with /api
        target: "http://localhost:3000", // Forward to backend on port 5000
        changeOrigin: true, // Change the origin header to match target
      },
    },
    strictPort: true,

    // middlewareMode
  },
  preview: {
    port: 4000,
    host: "0.0.0.0",
  }
});
