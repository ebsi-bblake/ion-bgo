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
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { Capacitor } from "@capacitor/core";
import { DocumentScanner } from "capacitor-document-scanner"; // Your plugin

const adjustedCorners = {
  topLeftCorner: { x: 0, y: 0 },
  topRightCorner: { x: 0, y: 0 },
  bottomLeftCorner: { x: 0, y: 0 },
  bottomRightCorner: { x: 0, y: 0 },
};
const updateCornerPoints = (corner, newX, newY) => {
  adjustedCorners[corner] = { x: newX, y: newY };
};
// State management
const AppState = {
  Pre: "pre",
  Streaming: "streaming",
  // Capture: "capture",
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
              appState.value = AppState.Streaming;
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
      // Draw the current video frame onto the canvas
      ctx.drawImage(videoElement, 0, 0);

      if (canvasRef.value) {
        // Existing functionality: Highlight paper using the scanner
        const resultCanvas = scanner.highlightPaper(canvasRef.value, {
          thickness: 5,
          color: "blue",
        });
        if (resultCanvas) {
          ctx.drawImage(resultCanvas, 0, 0);
        }

        // Run the improved bordering algorithm to detect and draw borders
        // improveBorderingAlgorithm(); // This will trace the borders on the live video
      }
    }
    requestAnimationFrame(frame); // Continue processing the next frame
  };
  frame();
};

const improveBorderingAlgorithm = (borderColor = "blue") => {
  const canvas = canvasRef.value; // The canvas displaying the video feed
  const ctx = canvas.getContext("2d");

  // Get the current frame from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const srcMat = cv.matFromImageData(imageData);

  // Convert image to grayscale for better edge detection
  const grayMat = new cv.Mat();
  cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY, 0);

  // Apply GaussianBlur to smooth the image
  const blurredMat = new cv.Mat();
  cv.GaussianBlur(grayMat, blurredMat, new cv.Size(5, 5), 0);

  // Use Canny edge detection
  const edgesMat = new cv.Mat();
  cv.Canny(blurredMat, edgesMat, 50, 150);

  // Find contours
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    edgesMat,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE,
  );

  // Filter the contours and find the largest one
  let largestContour = null;
  let maxArea = 0;
  for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);
    const area = cv.contourArea(contour, false);

    if (area > maxArea) {
      maxArea = area;
      largestContour = contour;
    }
  }

  // Use contour approximation for smoother borders
  const approxContour = new cv.Mat();
  if (largestContour) {
    const perimeter = cv.arcLength(largestContour, true);
    cv.approxPolyDP(largestContour, approxContour, 0.02 * perimeter, true);

    // Draw the approximated contour as the border with the provided color
    ctx.lineWidth = 3;
    ctx.strokeStyle = borderColor; // Use the color provided ('blue' during stream, 'white' during capture)
    ctx.beginPath();
    for (let i = 0; i < approxContour.data32S.length / 2; i++) {
      const x = approxContour.data32S[i * 2];
      const y = approxContour.data32S[i * 2 + 1];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Clean up OpenCV memory
  srcMat.delete();
  grayMat.delete();
  blurredMat.delete();
  edgesMat.delete();
  contours.delete();
  hierarchy.delete();
  approxContour.delete();
};

// Capture image and switch to interaction state
const captureImage = () => {
  const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;
  const ctx = resultCanvas.getContext("2d");

  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
  resultCanvas.style.display = "block";

  stopVideoFeed();
  improveBorderingAlgorithm("white"); // Pass 'white' for capture
  canvas.style.display = "none";
  videoRef.value.style.display = "none";
  drawCaptureBoundary(canvas, ctx);

  appState.value = AppState.Interaction; // Switch to interaction state
};

const drawCornerCircles = (cornerPoints, ctx) => {
  const circleRadius = 10;

  // Extract the corners
  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    cornerPoints;

  // Draw a circle at each corner point
  [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner].forEach(
    (corner) => {
      ctx.beginPath();
      ctx.arc(corner.x, corner.y, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Circle color
      ctx.fill();
      ctx.strokeStyle = "white"; // Circle border color
      ctx.lineWidth = 2;
      ctx.stroke();
    },
  );
};
const drawCaptureBoundary = (canvas, ctx) => {
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
  adjustedCorners.topLeftCorner = topLeftCorner;
  adjustedCorners.topRightCorner = topRightCorner;
  adjustedCorners.bottomLeftCorner = bottomLeftCorner;
  adjustedCorners.bottomRightCorner = bottomRightCorner;

  // Draw the exact boundary by connecting the corner points
  ctx.lineWidth = 3; // Set the border width
  ctx.strokeStyle = "white"; // Set the border color
  ctx.beginPath();
  ctx.moveTo(topLeftCorner.x, topLeftCorner.y); // Move to top left corner
  ctx.lineTo(topRightCorner.x, topRightCorner.y); // Draw line to top right corner
  ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y); // Draw line to bottom right corner
  ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y); // Draw line to bottom left corner
  ctx.closePath(); // Close the path (connect bottom left to top left)
  ctx.stroke(); // Render the border/ Draw the boundary

  drawCornerCircles(cornerPoints, ctx);
};

// Extract the document
const extractDocument = () => {
  const canvas = canvasRef.value;
  const resultCanvas = resultCanvasRef.value;
  const ctx = resultCanvas.getContext("2d");

  const scanner = new jscanify();

  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    adjustedCorners;

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
    );
  };

  const getDistance = (a, b, c, d) =>
    Math.floor(Math.max(calculateDistance(a, b), calculateDistance(c, d)));

  const paperWidth = getDistance(
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner,
  );
  const paperHeight = getDistance(
    topLeftCorner,
    bottomLeftCorner,
    topRightCorner,
    bottomRightCorner,
  );

  // Math.max(
  //   calculateDistance(topLeftCorner, topRightCorner),
  //   calculateDistance(bottomLeftCorner, bottomRightCorner),
  // );
  // const paperHeight = Math.max(
  //   calculateDistance(topLeftCorner, bottomLeftCorner),
  //   calculateDistance(topRightCorner, bottomRightCorner),
  // );

  console.log(canvas, paperWidth, paperHeight);

  // Get the current frame from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const resultCanvasImage = scanner.extractPaper(
    "outputCanvas",
    paperWidth,
    paperHeight,
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
