import { defineConfig } from "vite";
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
