<template>
  <ion-page>
    <ion-content>
      <!-- Video feed (hidden after capture) -->
      <video
        ref="videoRef"
        id="videoSource"
        playsinline
        autoplay
        muted
        style="opacity: 0; width: 0; height: 0"
      ></video>

      <!-- Initial Canvas for video frame (hidden after capture) -->
      <ion-icon
        id="close-camera"
        :name="closeOutline"
        v-if="appState === AppState.Streaming"
        @click="stopVideoFeed"
      >
      </ion-icon>
      <canvas ref="canvasRef" id="outputCanvas"></canvas>

      <!-- Canvas for captured image (visible after capture) -->
      <canvas
        ref="resultCanvasRef"
        id="resultCanvas"
        style="display: none"
      ></canvas>

      <div class="action-buttons">
        <ion-button @click="scanDocument">
          {{ "appState === AppState.Pre" ? "Start" : "Retake" }}
        </ion-button>

        <ion-button
          v-if="appState === AppState.Streaming"
          @click="captureImage"
        >
          Capture Image
        </ion-button>
        <ion-button v-if="appState === AppState.Streaming" @click="toggleFlash">
          Turn On Flash
        </ion-button>

        <ion-button
          v-if="appState === AppState.Interaction"
          @click="extractDocument"
        >
          Extract
        </ion-button>

        <ion-button
          v-if="[AppState.Interaction].includes(appState)"
          @click="saveDocument"
        >
          Save
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { Capacitor } from "@capacitor/core";
import { DocumentScanner } from "capacitor-document-scanner";
import {
  adjustedCorners,
  AppState,
  clearStateAndStart,
  drawCaptureBoundary,
  borderingAlgorithm,
  onMouseMove,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
} from "./model.ts";
import { JScanify } from "@/utils/jscanify";

// Platform detection
const isMobile = Capacitor.getPlatform() !== "web";

const appState = ref(AppState.Pre);
const imageSrc = ref("");
const videoRef = ref(null);
const canvasRef = ref(null);
const resultCanvasRef = ref(null);

// Mobile-specific document scanning
const scanDocument = async () => {
  if (isMobile) {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        responseType: "base64",
      });
      if (scannedImages) {
        (imageSrc.value = CavideoRef),
          canvasRefpacitor.convertFileSrc(scannedImages[0]);
      }
    } catch (error) {
      console.error("Scan failed:", error);
    }
  } else {
    clearStateAndStart(
      imageSrc,
      videoRef,
      canvasRef,
      resultCanvasRef,
      appState
    );
  }
};

// Capture image and switch to interaction state
const captureImage = () => {
  const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;
  const ctx = resultCanvas.getContext("2d");

  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
  resultCanvas.style.display = "block";

  // stopVideoFeed();
  borderingAlgorithm(canvasRef, "white"); // Pass 'white' for capture
  canvas.style.display = "none";
  videoRef.value.style.display = "none";
  drawCaptureBoundary(canvas, ctx);

  appState.value = AppState.Interaction;
  startInteraction(); // Switch to interaction state
};

const startInteraction = () => {
  const resultCanvas = resultCanvasRef.value;

  // Check if a point is inside a circle

  // Add event listeners for mouse and touch
  resultCanvas.addEventListener("mousedown", onMouseDown(resultCanvas));
  resultCanvas.addEventListener("mousemove", onMouseMove(resultCanvas));
  resultCanvas.addEventListener("mouseup", onMouseUp(resultCanvas));

  resultCanvas.addEventListener("touchstart", onTouchStart(resultCanvas));
  resultCanvas.addEventListener("touchmove", onTouchMove(resultCanvas));
  resultCanvas.addEventListener("touchend", onTouchEnd(resultCanvas));
};

// Extract the document
const extractDocument = () => {
  // const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;
  const ctx = resultCanvas.getContext("2d");
  console.log("wait a min", JScanify);
  const scanner = JScanify();

  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    adjustedCorners;

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };

  const getDistance = (a, b, c, d) =>
    Math.floor(Math.max(calculateDistance(a, b), calculateDistance(c, d)));

  const paperWidth = getDistance(
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner
  );
  const paperHeight = getDistance(
    topLeftCorner,
    bottomLeftCorner,
    topRightCorner,
    bottomRightCorner
  );

  // Get the current frame from the canvas
  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const resultCanvasImage = scanner.extractPaper(
    "outputCanvas",
    paperWidth,
    paperHeight
  );

  console.log(resultCanvasImage);
  resultCanvas.width = paperWidth;
  resultCanvas.height = paperHeight;
  ctx.drawImage(resultCanvasImage, 0, 0);

  // appState.value = AppState.Save; // Switch to save state
};

// Save the document
const saveDocument = () => {
  // Save document logic
  appState.value = AppState.Pre; // Reset to pre state
};

// Stop the video feed
const stopVideoFeed = () => {
  if (videoRef.value && videoRef.value.srcObject) {
    const tracks = videoRef.value.srcObject.getTracks();
    tracks.forEach((track) => track.stop()); // Stop all tracks
    videoRef.value.srcObject = null; // Clear the video stream
  }

  appState.value = AppState.Pre; // Reset the app state to 'Pre'
}; // Load OpenCV before starting the scanner

// Toggle flash
const toggleFlash = () => {
  isFlashOn.value = !isFlashOn.value;
};
</script>

<style scoped>
#resultCanvas,
#outputCanvas {
  position: relative;
  top: 100px;
  width: 100%;
  max-width: 640px;
  height: 560px;
  border: 1px solid #ccc;
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}

.close-camera {
  position: relative;
  font-size: 200px;
  border: 3px solid orange;
}
</style>
