<template>
  <ion-page>
    <ion-content>
      <ion-img :src="imageSrc" id="scannedImage"></ion-img>
      <canvas ref="canvasRef" id="outputCanvas"></canvas>
      <video ref="videoRef" playsinline autoplay muted hidden></video>

      <div class="action-buttons">
        <!-- Show these buttons when the video is NOT playing -->
        <ion-button v-if="!isVideoPlaying && !isMobile" @click="reqPerms"
          >Get Permissions</ion-button
        >
        <ion-button v-if="!isVideoPlaying && hasPerm" @click="scanDocument"
          >Start</ion-button
        >

        <!-- Show these buttons when the video IS playing -->
        <ion-button v-if="isVideoPlaying" @click="captureImage"
          >Capture Image</ion-button
        >
        <ion-button v-if="isVideoPlaying" @click="toggleFlash"
          >Turn On Flash</ion-button
        >
        <ion-button v-if="isVideoPlaying" @click="cancelOperation"
          >Cancel</ion-button
        >
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
const isVideoPlaying = ref(false); // Tracks if the video is playing
const isFlashOn = ref(false);
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
      isVideoPlaying.value = true;
      requestAnimationFrame(() => drawToCanvas(videoRef.value, context));
    };
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
};

function drawToCanvas(video, context) {
  if (video.paused || video.ended) return;

  // Clear the canvas and draw the current video frame on it
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

  // Capture the frame from the canvas
  const src = cv.imread(context.canvas);

  // Convert to grayscale
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

  // Apply Canny edge detection
  const edges = new cv.Mat();
  cv.Canny(gray, edges, 50, 150, 3, false);

  // Find contours
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    edges,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE,
  );

  // Find the largest contour
  let largestContour = null;
  let maxArea = 0;
  for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);
    const area = cv.contourArea(contour);
    if (area > maxArea) {
      maxArea = area;
      largestContour = contour;
    }
  }

  if (largestContour) {
    // Approximate the contour to a polygon
    const approx = new cv.Mat();
    const perimeter = cv.arcLength(largestContour, true);
    cv.approxPolyDP(largestContour, approx, 0.02 * perimeter, true);

    // If the approximated contour has 4 points, assume it's the document
    if (approx.rows === 4) {
      // Draw the contour (bounding box or quadrilateral)
      const points = [];
      for (let i = 0; i < 4; i++) {
        points.push({
          x: approx.intPtr(0, i)[0],
          y: approx.intPtr(0, i)[1],
        });
      }
      // Draw the quadrilateral
      for (let i = 0; i < 4; i++) {
        const startPoint = new cv.Point(points[i].x, points[i].y);
        const endPoint = new cv.Point(
          points[(i + 1) % 4].x,
          points[(i + 1) % 4].y,
        );
        cv.line(src, startPoint, endPoint, new cv.Scalar(255, 0, 0, 255), 4);
      }
    }

    approx.delete();
  }

  // Display the processed frame back on the canvas
  cv.imshow(context.canvas, src);

  // Clean up
  src.delete();
  gray.delete();
  edges.delete();
  contours.delete();
  hierarchy.delete();

  // Continue processing the next frame
  requestAnimationFrame(() => drawToCanvas(video, context));
}

const captureImage = () => {
  if (!canvasRef.value) return;

  const context = canvasRef.value.getContext("2d");
  context.drawImage(
    videoRef.value,
    0,
    0,
    canvasRef.value.width,
    canvasRef.value.height,
  );

  // Convert the canvas content to an image
  imageSrc.value = canvasRef.value.toDataURL("image/png");

  // Stop the video feed and reset the state
  stopVideoFeed();
};

const toggleFlash = () => {
  isFlashOn.value = !isFlashOn.value;
  // Implement the logic to turn on the flash (if supported)
  console.log(`Flash turned ${isFlashOn.value ? "on" : "off"}`);
};

const cancelOperation = () => {
  stopVideoFeed();
  imageSrc.value = ""; // Reset the image source
};

const stopVideoFeed = () => {
  if (videoRef.value && videoRef.value.srcObject) {
    const tracks = videoRef.value.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    isVideoPlaying.value = false; // Reset the video playing state
  }
};

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
