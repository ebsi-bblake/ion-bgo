<template>
  <ion-page>
    <ion-content>
      <!-- Video feed for pose detection -->
      <video
        ref="videoRef"
        id="videoSource"
        playsinline
        autoplay
        muted
        style="display: none"
      ></video>

      <!-- Canvas for pose overlay -->
      <canvas ref="canvasRef" id="outputCanvas"></canvas>

      <div class="action-buttons">
        <ion-button @click="startPoseDetection">
          {{ appState === "Pre" ? "Start Pose Detection" : "Retake" }}
        </ion-button>
        <ion-button v-if="appState === 'Streaming'" @click="stopPoseDetection">
          Stop
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  initPoseDetection,
  stopPoseDetection,
  drawConnectors,
  drawLandmarks,
} from "./model"; // Import the functions
import { IonPage, IonContent, IonButton } from "@ionic/vue";

const appState = ref("Pre");
const videoRef = ref(null);
const canvasRef = ref(null);

const onResults = (results) => {
  const canvasCtx = canvasRef.value.getContext("2d");
  canvasCtx.clearRect(
    0,
    0,
    videoRef.value.videoWidth,
    videoRef.value.videoHeight
  );
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasRef.value.width,
    canvasRef.value.height
  );
  console.log(window);
  console.log(results);
  if (results.poseLandmarks) {
    drawConnectors(canvasCtx, results.poseLandmarks, window.POSE_CONNECTIONS, {
      color: "white",
      lineWidth: 2,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "red",
      lineWidth: 2,
    });
  }
};

const startPoseDetection = async () => {
  await initPoseDetection(videoRef.value, canvasRef.value, onResults);
  appState.value = "Streaming";
};

onMounted(() => {
  startPoseDetection();
});

onBeforeUnmount(() => {
  stopPoseDetection(videoRef.value); // Stop pose detection when leaving the component
});
</script>

<style scoped>
#outputCanvas {
  width: 100%;
  height: auto;
  min-height: 500px;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}
</style>
