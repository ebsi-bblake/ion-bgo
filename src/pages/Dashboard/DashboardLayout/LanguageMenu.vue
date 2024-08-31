<template>
  <ion-menu side="end" menu-id="language-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle menu="language-menu">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Language</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list>
          <ion-item>
            <ion-label> <span>🇺🇸</span> English </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> <span>🇲🇽</span> Spanish </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> <span>🇫🇷</span> French </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> <span>🇳🇱</span> Dutch </ion-label>
          </ion-item>
          <ion-item>
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
  IonButtons,
  IonMenuToggle,
  IonIcon,
  IonTitle,
  IonLabel,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
</script>
