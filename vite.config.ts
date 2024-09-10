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
        manifest: {
          name: "ion-bgo",
          id: "/ion-bgo",
          short_name: "IonBGO",
          description: "An Ionic version of BGO...just in case",
          start_url: "/ion-bgo",
          display: "fullscreen",
          display_override: ["fullscreen"],
          background_color: "#ffffff",
          theme_color: "#3880ff",
          icons: [
            {
              src: "/favicon.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "../icons/icon-48.webp",
              type: "image/png",
              sizes: "48x48",
              purpose: "any maskable",
            },
            {
              src: "../icons/icon-72.webp",
              type: "image/png",
              sizes: "72x72",
              purpose: "any maskable",
            },
            {
              src: "../icons/icon-96.webp",
              type: "image/png",
              sizes: "96x96",
              purpose: "any maskable",
            },
            {
              src: "../icons/icon-128.webp",
              type: "image/png",
              sizes: "128x128",
              purpose: "any maskable",
            },
            {
              src: "../icons/icon-192.webp",
              type: "image/png",
              sizes: "192x192",
              purpose: "any maskable",
            },
            {
              src: "../icons/icon-256.webp",
              type: "image/png",
              sizes: "256x256",
              purpose: "any maskable",
            },
            {
              src: "../icons/icon-512.webp",
              type: "image/png",
              sizes: "512x512",
              purpose: "any maskable",
            },
          ],
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
      outDir: "docs/",
      assetsDir: "assets/",
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
