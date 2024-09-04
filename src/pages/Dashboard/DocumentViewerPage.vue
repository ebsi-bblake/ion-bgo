<template>
  <ion-page class="container">
    <ion-content :fullscreen="true">
      <span v-if="isClicked">{{ scannedImages }}</span>
      <IonButton @click="scanDocument">Test</IonButton>
      <ExploreContainer name="Document Viewewrpage" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { Capacitor } from "@capacitor/core";
import { DocumentScanner } from "capacitor-document-scanner";
import { ref } from "vue";
const isClicked = ref(false);
const contents = ref("");
const scanDocument = async () => {
  isClicked.value = !isClicked.value;
  contents.value = JSON.stringify(DocumentScanner);
  // start the document scanner
  const { scannedImages } = await DocumentScanner.scanDocument();
  // get back an array with scanned image file paths
  if (scannedImages.length > 0) {
    // set the img src, so we can view the first scanned image
    const scannedImage = document.getElementById(
      "scannedImage",
    ) as HTMLImageElement;
    scannedImage.src = Capacitor.convertFileSrc(scannedImages[0]);
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
