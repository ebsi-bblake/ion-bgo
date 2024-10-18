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
        <!-- Start or Retake Pose Detection -->
        <ion-button @click="startDetection">
          {{ appState === "Pre" ? "Start Pose Detection" : "Retake" }}
        </ion-button>

        <!-- Stop Pose Detection -->
        <ion-button v-if="appState === 'Streaming'" @click="stopDetection">
          Stop
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import {
  initPoseDetection,
  stopPoseDetection,
  drawConnectors,
  drawLandmarks,
  appState, // Import the appState from model
} from "./model";

const videoRef = ref(null);
const canvasRef = ref(null);

// Handle pose detection results
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

// Start pose detection
const startDetection = async () => {
  await initPoseDetection(videoRef.value, canvasRef.value, onResults);
};

// Stop pose detection
const stopDetection = () => {
  stopPoseDetection(videoRef.value);
};

onMounted(() => {
  appState.value = "Pre"; // Set initial state
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
