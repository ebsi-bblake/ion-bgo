<template>
  <ion-page>
    <ion-content>
      <ion-img :src="imageSrc" id="scannedImage"></ion-img>
      <canvas ref="canvasRef" id="outputCanvas"></canvas>
      <!-- Add ref for canvas -->
      <video ref="videoRef" playsinline autoplay muted hidden></video>
      <!-- Add ref for video -->
      <div class="action-buttons">
        <ion-button v-if="!isMobile" @click="reqPerms"
          >Get Permissions</ion-button
        >
        <ion-button v-if="hasPerm" @click="scanDocument">Test</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  IonPage,
  IonContent,
  IonImg,
  IonButton,
  getPlatforms,
} from "@ionic/vue";
import { Capacitor } from "@capacitor/core";
import { DocumentScanner } from "capacitor-document-scanner";

// Refs to manage states
const isMobile = getPlatforms().includes("capacitor");
const imageSrc = ref("");
const hasPerm = ref(isMobile);

// Refs for video and canvas elements
const videoRef = ref(null); // Ref for video element
const canvasRef = ref(null); // Ref for canvas element

const reqPerms = () => {
  navigator.permissions
    .query({ name: "camera" })
    .then((s) => {
      console.log(s);
      hasPerm.value = true;
    })
    .catch((e) => console.log("No camera permissions: ", e));
};

const scanDocument = async () => {
  if (isMobile) {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        responseType: "base64",
      });
      if (scannedImages) {
        imageSrc.value = Capacitor.convertFileSrc(scannedImages[0]);
      }
    } catch (error) {
      console.error("Scan failed:", error);
    }
  } else {
    startVideoFeed();
  }
};

const startVideoFeed = async () => {
  if (!canvasRef.value || !videoRef.value) return; // Ensure refs are set

  const context = canvasRef.value.getContext("2d");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });

    videoRef.value.srcObject = stream;
    videoRef.value.onloadedmetadata = () => {
      videoRef.value.play();
      console.log("Video metadata loaded, video playing.");
      requestAnimationFrame(() => drawToCanvas(videoRef.value, context));
    };
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
};

function drawToCanvas(video, context) {
  if (video.paused || video.ended) {
    console.log("Video is paused or ended.");
    return;
  }

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

  requestAnimationFrame(() => drawToCanvas(video, context));
}

// Run onMounted to ensure the component is fully loaded
onMounted(() => {
  // You can put any initialization logic here if needed
});
</script>
<style scoped>
#outputCanvas {
  /* position: relative; */
  top: 100px;
  width: 100%;
  max-width: 640px;
  height: 460px;
  margin-top: 100px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}

ion-button {
  margin: 0 10px;
}
</style>
