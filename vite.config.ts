import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },

  plugins: [react(), visualizer({ open: true, template: "flamegraph" })],

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
