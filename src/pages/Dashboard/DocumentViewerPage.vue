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
      <canvas ref="canvasRef" id="outputCanvas"></canvas>

      <!-- Canvas for captured image (visible after capture) -->
      <canvas
        ref="resultCanvasRef"
        id="resultCanvas"
        style="display: none"
      ></canvas>

      <div class="action-buttons">
        <ion-button v-if="appState === AppState.Pre" @click="scanDocument">
          Start
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
          v-if="appState === AppState.Streaming"
          @click="stopVideoFeed"
        >
          Stop
        </ion-button>

        <ion-button
          v-if="appState === AppState.Capture"
          @click="extractDocument"
        >
          Extract
        </ion-button>

        <ion-button
          v-if="[AppState.Capture, AppState.Interaction].includes(appState)"
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
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { Capacitor } from "@capacitor/core";
import { DocumentScanner } from "capacitor-document-scanner"; // Your plugin

// State management
const AppState = {
  Pre: "pre",
  Streaming: "streaming",
  Capture: "capture",
  Interaction: "interaction",
  Save: "save",
};

// Platform detection
const isMobile = Capacitor.getPlatform() !== "web";

const appState = ref(AppState.Pre);
const imageSrc = ref("");
const videoRef = ref(null);
const canvasRef = ref(null);
const resultCanvasRef = ref(null);

// Function  to clear state and start the video feed
const clearStateAndStart = () => {
  // Clear state
  imageSrc.value = ""; // Clear any previously captured image
  resultCanvasRef.value.style.display = "none"; // Hide the result canvas from previous capture
  videoRef.value.style.display = "block"; // Make sure the video is visible
  canvasRef.value.style.display = "block"; // Ensure the canvas is visible for new captures

  // Clear the canvases
  const outputCtx = canvasRef.value.getContext("2d");
  const resultCtx = resultCanvasRef.value.getContext("2d");
  outputCtx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height); // Clear the output canvas
  resultCtx.clearRect(
    0,
    0,
    resultCanvasRef.value.width,
    resultCanvasRef.value.height,
  ); // Clear the result canvas

  // Transition to streaming state and start the video feed
  appState.value = AppState.Streaming;
  startVideoFeed();
};

// Mobile-specific document scanning
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
    clearStateAndStart();
  }
};

// Start the video feed
const startVideoFeed = () => {
  appState.value = AppState.Streaming;
  const constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  };

  console.log(videoRef.value.style.display);
  if (!videoRef.value || !canvasRef.value) {
    console.error("Video or canvas references are not available");
    return;
  }
  // Ensure the canvas is cleared before starting the video again
  const ctx = canvasRef.value.getContext("2d");
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  loadOpenCv(() => {
    console.log("OpenCV loaded and ready.");
    initCamera(constraints, videoRef.value, () => {
      // console.log("initCamera", videoRef.value);
      const ctx = canvasRef.value.getContext("2d");
      const scanner = new jscanify();
      copyToCanvas(videoRef.value, ctx, scanner);
    });
  });
};

// Camera initialization
const initCamera = (constraints, videoElement, callback) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.addEventListener("loadeddata", () => {
        let attempts = 10;
        const checkVideo = () => {
          if (attempts > 0) {
            if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
              videoElement.play();
              setVideoAndCanvasDimensions();
              callback();
            } else {
              setTimeout(checkVideo, 100);
            }
          } else {
            callback("Unable to play video stream.");
          }
          attempts--;
        };
        checkVideo();
      });
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
};

const setVideoAndCanvasDimensions = () => {
  const videoElement = videoRef.value;
  const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;

  const videoWidth = videoElement.videoWidth;
  const videoHeight = videoElement.videoHeight;

  // Set video, outputCanvas, and resultCanvas to the same dimensions
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  resultCanvas.width = videoWidth;
  resultCanvas.height = videoHeight;
};

// Copy video feed to canvas
const copyToCanvas = (videoElement, ctx, scanner) => {
  const frame = () => {
    if (videoElement) {
      ctx.drawImage(videoElement, 0, 0);
      if (canvasRef.value) {
        const resultCanvas = scanner.highlightPaper(canvasRef.value);
        if (resultCanvas) {
          ctx.drawImage(resultCanvas, 0, 0);
        }
      }
    }
    requestAnimationFrame(frame);
  };
  frame();
};

// Capture image and switch to interaction state
const captureImage = () => {
  const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;
  const ctx = resultCanvas.getContext("2d");

  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
  resultCanvas.style.display = "block";

  stopVideoFeed();
  canvas.style.display = "none";
  videoRef.value.style.display = "none";

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);
  const srcMat = cv.matFromImageData(imageData);
  const scanner = new jscanify();

  const contour = scanner.findPaperContour(srcMat);

  if (!contour) {
    console.error("No document found!");
    return;
  }
  const cornerPoints = scanner.getCornerPoints(contour);
  // Example calculation of boundary box using corner points
  // Extract all corner points
  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    cornerPoints;

  // Draw the exact boundary by connecting the corner points
  ctx.lineWidth = 3; // Set the border width
  ctx.strokeStyle = "red"; // Set the border color
  ctx.beginPath();
  ctx.moveTo(topLeftCorner.x, topLeftCorner.y); // Move to top left corner
  ctx.lineTo(topRightCorner.x, topRightCorner.y); // Draw line to top right corner
  ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y); // Draw line to bottom right corner
  ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y); // Draw line to bottom left corner
  ctx.closePath(); // Close the path (connect bottom left to top left)
  ctx.stroke(); // Render the border/ Draw the boundary

  appState.value = AppState.Capture; // Switch to interaction state
};

// const captureImage = () => {
//   const canvas = canvasRef.value;  // Output canvas where the image is captured
//   const ctx = canvas.getContext("2d");
//
//   // Draw the current video frame onto the output canvas
//   ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
//
//   // Assuming the boundary box is calculated using the scanner logic (similar to streaming)
//   const imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
//   const srcMat = cv.matFromImageData(imageData);
//   const scanner = new jscanify();
//
//   // Get the boundary box from the scanner or other logic (e.g., from getCornerPoints)
//   const contour = scanner.findPaperContour(srcMat);
//   const cornerPoints = scanner.getCornerPoints(contour);
//
//   if (!cornerPoints) {
//     console.error("No valid boundary box found.");
//     return;
//   }
//
//   // Example calculation of boundary box using corner points
//   const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } = cornerPoints;
//
//   const boundaryBox = {
//     x: topLeftCorner.x,
//     y: topLeftCorner.y,
//     width: topRightCorner.x - topLeftCorner.x,
//     height: bottomLeftCorner.y - topLeftCorner.y
//   };
//
//   // Draw the boundary box on the captured image
//   ctx.lineWidth = 3;  // Set the border width
//   ctx.strokeStyle = 'red';  // Set the border color to match the one during the stream
//   ctx.strokeRect(boundaryBox.x, boundaryBox.y, boundaryBox.width, boundaryBox.height);  // Draw the boundary
//
//   // Transition to the capture state where the user can save or interact
//   appState.value = AppState.Capture;
// };

// Extract the document
const extractDocument = () => {
  appState.value = AppState.Interaction; // Switch to interaction state
  const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;
  const ctx = resultCanvas.getContext("2d");

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);
  const srcMat = cv.matFromImageData(imageData);
  const scanner = new jscanify();

  const contour = scanner.findPaperContour(srcMat);
  const cornerPoints = scanner.getCornerPoints(contour);
  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    cornerPoints;

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
    );
  };

  const paperWidth = Math.max(
    calculateDistance(topLeftCorner, topRightCorner),
    calculateDistance(bottomLeftCorner, bottomRightCorner),
  );
  const paperHeight = Math.max(
    calculateDistance(topLeftCorner, bottomLeftCorner),
    calculateDistance(topRightCorner, bottomRightCorner),
  );

  const resultCanvasImage = scanner.extractPaper(
    canvas,
    paperWidth,
    paperHeight,
  );
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

  // Clear the canvas
  // const ctx = canvasRef.value.getContext("2d");
  // ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  //
  appState.value = AppState.Pre; // Reset the app state to 'Pre'
}; // Load OpenCV before starting the scanner
const loadOpenCv = (onComplete) => {
  const openCvURL = "https://docs.opencv.org/4.7.0/opencv.js";
  const isScriptPresent = !!document.getElementById("open-cv");

  if (isScriptPresent) {
    onComplete();
  } else {
    const script = document.createElement("script");
    script.id = "open-cv";
    script.src = openCvURL;
    script.onload = () => setTimeout(onComplete, 1000);
    document.body.appendChild(script);
  }
};

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
</style>
