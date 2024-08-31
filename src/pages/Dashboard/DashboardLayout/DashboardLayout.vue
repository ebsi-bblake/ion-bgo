<template>
  <ion-page>
    <AppHeader :show-tabs="showTabs" :logo-icon="logoIcon" />
    <AiFloatingButton />
    <ion-router-outlet id="main-content"></ion-router-outlet>
    <AppFooter v-if="showTabs" />
    <SideMenu />
    <LanguageMenu />
  </ion-page>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { IonPage, IonRouterOutlet } from "@ionic/vue";
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import AiFloatingButton from "./AiFloatingBtn.vue";
import SideMenu from "./SideMenu.vue";
import LanguageMenu from "./LanguageMenu.vue";
import logoIcon from "./1024.png";

const screenWidth = inject("screenWidth", ref(window.innerWidth));
const showTabs = computed(() => screenWidth.value <= 768);
</script>

<style lang="css">
.dropdown-menu {
  position: absolute;
  top: 56px;
  right: 16px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 4px;
}
</style>
