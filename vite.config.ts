/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@layouts": path.resolve(__dirname, "./src/views/layouts"),
      "@pages": path.resolve(__dirname, "./src/views/pages"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
  },
});
