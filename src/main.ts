import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
// Register the service worker
if ("serviceWorker" in navigator) {
  const swPath =
    window.location.hostname === "localhost"
      ? "../dev-dist/sw.js"
      : "/ion-bgo/sw.js";
  navigator.serviceWorker
    .register(swPath)
    .then(() => console.log(`Service Worker registered at: ${swPath}`))
    .catch((error) =>
      console.error("Service Worker registration failed:", error)
    );
}
// Above the createApp() line
defineCustomElements(window);
const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(() => {
  app.mount("#app");
});
