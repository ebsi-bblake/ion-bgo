<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { ref, onMounted, onUnmounted, provide } from "vue";

const screenWidth = ref(window.innerWidth);

// Function to update screen width
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

// Attach the resize event listener on mounted
onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
});

// Remove the resize event listener on unmounted
onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
// Provide the screenWidth to be accessible by other components
provide("screenWidth", screenWidth);
</script>
