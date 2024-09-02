<template>
  <ion-fab vertical="bottom" horizontal="start" slot="fixed" style="bottom: 0px">
    <ion-fab-button id="ai-fab-btn" @click="navigateTo('ai-chat')">
      <ion-icon icon=""></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";

import { useRouter } from "vue-router";
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
#ai-fab-btn {
  width: 76px;
  height: 76px;
}

on-fab-button {
  --width: 56px;
  --height: 56px;
  --border-radius: 50%;
  --background: #3880ff;
}
</style>
