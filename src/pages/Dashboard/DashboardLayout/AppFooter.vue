<template>
  <ion-footer>
    <ion-toolbar :id="toolbarId">
      This will be styled differently on iOS.>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="ai" href="/dashboard/ai-chat">
            <ion-icon class="ai-focus" />
          </ion-tab-button>
          <ion-tab-button tab="home" href="/dashboard/home">
            <ion-icon :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="inbox" href="/dashboard/inbox">
            <ion-icon :icon="mailOutline" />
            <ion-label>Inbox</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="contact-us" href="/dashboard/contact-us">
            <ion-icon :icon="callOutline" style="transform: scaleX(-1)" />
            <ion-label>Contact Us</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="settings" href="/dashboard/settings">
            <ion-icon :icon="settingsOutline" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
import {
  IonFooter,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  homeOutline,
  mailOutline,
  callOutline,
  settingsOutline,
} from "ionicons/icons";
import { Capacitor } from "@capacitor/core";
console.log("platform", Capacitor.platform);
const toolbarId = Capacitor.platform !== "web" ? "ion-toolbar-footer" : null;
</script>

<style scoped>
#ion-toolbar-footer {
  --min-height: 100px;
  --padding-top: 20px;
  --padding-bottom: 0px;
  padding-bottom: 0px !important;
}
</style>
