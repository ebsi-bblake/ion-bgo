/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import mkcert from "vite-plugin-mkcert";
import fs from "fs";

export default defineConfig(({ mode }) => {
  const isDev = () => mode == "development";
  return {
    base: "/ion-bgo/",
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
      }),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      isDev() && mkcert(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
    build: {
      target: "es2015",
      outDir: "docs",
      assetsDir: "assets",
      minify: "terser",
    },
    ...(isDev() && {
      server: {
        https: {
          key: fs.readFileSync("./.cert/key.pem"),
          cert: fs.readFileSync("./.cert/cert.pem"),
        },
      },
    }),
  };
});
