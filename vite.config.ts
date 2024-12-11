/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },

  plugins: [
    react(),
    visualizer({ open: true, template: "flamegraph" }),
    viteCompression({
      algorithm: "gzip", // or use 'gzip'
      ext: ".gz", // For Brotli, or '.gz' for gzip
      threshold: 10240, // Only compress files larger than 10 KB
    }),
  ],
  test: {
    globals: true, // Enables global usage of `describe`, `it`, `expect`, etc.
    environment: "jsdom", // Simulates a browser environment
    setupFiles: "./tests/setup.ts", // Path to setup file (if needed)
    coverage: {
      extension: ["ts", "tsx"],
      include: ["src/**/*.{ts,tsx}", "src/App.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/types/index.ts",
        "src/ui/SimulateAuthUser.tsx",
      ],
    },
  },

  build: {
    minify: "esbuild",
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          leaflet: ["leaflet"],
          "react-leaflet": ["react-leaflet"],
        },
      },
    },
  },
});
