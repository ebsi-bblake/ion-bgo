<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title title="logo" class="ion-text-center">
        <ion-img class="logo-img" :src="logoIcon"></ion-img>
      </ion-title>
      <ion-buttons v-if="!showTabs" slot="secondary">
        <ion-button>
          <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon slot="icon-only" :icon="search"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button
          id="notifications-button"
          router-link="/dashboard/to-do-list"
        >
          <ion-icon
            slot="icon-only"
            id="notifications-icon"
            :icon="notificationsOutline"
          ></ion-icon>
          <ion-badge id="notifications-badge" color="danger">1</ion-badge>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-router-outlet id="main-content"></ion-router-outlet>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonImg,
  IonButton,
  IonIcon,
  IonBadge,
  IonRouterOutlet,
} from "@ionic/vue";
import { personCircle, search, notificationsOutline } from "ionicons/icons";

defineProps(["showTabs", "logoIcon"]);
</script>

<style scoped>
ion-toolbar {
  --min-height: 100px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

#notification-button {
  position: relative;
  top: 1px;
  right: 1px;
  overflow: visible !important;
}

#notifications-icon {
  font-size: 40px;
  width: 40px;
  height: 40px;
}

#notifications-badge {
  background-color: maroon;
  color: white;
  position: absolute;
  width: 18px;
  top: -3px;
  right: -3px;
  border-radius: 100%;
}

.logo-img {
  height: 68px;
  width: 256px;
}
</style>
