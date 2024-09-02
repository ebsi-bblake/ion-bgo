<template>
  <ion-menu side="end" menu-id="language-menu" content-id="main-content" type="overlay" class="full-width">
    <ion-header>
      <ion-toolbar>
        <ion-button fill="clear" slot="start">
          <ion-menu-toggle menu="language-menu">
            <ion-icon :icon="chevronBack"></ion-icon>
          </ion-menu-toggle>
        </ion-button>
        <ion-title>Language</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list>
          <ion-item button @click="closeLanguageMenu">
            <ion-label><span>🇺🇸</span> English </ion-label>
          </ion-item>
          <ion-item button @click="closeLanguageMenu">
            <ion-label> <span>🇲🇽</span> Spanish </ion-label>
          </ion-item>
          <ion-item button @click="closeLanguageMenu">
            <ion-label> <span>🇫🇷</span> French </ion-label>
          </ion-item>
          <ion-item button @click="closeLanguageMenu">
            <ion-label> <span>🇳🇱</span> Dutch </ion-label>
          </ion-item>
          <ion-item button @click="closeLanguageMenu">
            <ion-label> <span>🇭🇹</span> Haitian Creole </ion-label>
          </ion-item>
        </ion-list>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonButton,
  IonMenuToggle,
  IonIcon,
  IonTitle,
  IonLabel,
  IonContent,
  IonList,
  IonItem,
  menuController,
} from "@ionic/vue";
import { chevronBack } from "ionicons/icons";
const closeLanguageMenu = () => {
  menuController.close("language-menu");
};
</script>

<style scoped>
.full-width {
  --width: 100%;
}
</style>
