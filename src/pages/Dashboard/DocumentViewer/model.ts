import { ref } from "vue";
import { JScanify, JScanify as JScanifyType } from "@utils/jscanify";
const cv = window.cv;
// import { Prop } from "ionicons/dist/types/stencil-public-runtime";
interface Point {
  x: number;
  y: number;
}
type AdjustedCorners = {
  topLeftCorner: Point;
  topRightCorner: Point;
  bottomLeftCorner: Point;
  bottomRightCorner: Point;
};

const adjustedCorners: AdjustedCorners = {
  topLeftCorner: { x: 0, y: 0 },
  topRightCorner: { x: 0, y: 0 },
  bottomLeftCorner: { x: 0, y: 0 },
  bottomRightCorner: { x: 0, y: 0 },
};

// State management
enum AppState {
  Pre = "Pre",
  Streaming = "Streaming",
  Interaction = "Interaction",
  Save = "Save",
}

const selectedCorner = ref<Point | null>(null);
const circleRadius = 15;

// Function  to clear state and start the video feed
const clearStateAndStart = (
  imageSrc: { value: string },
  videoRef: { value: HTMLVideoElement },
  canvasRef: { value: HTMLCanvasElement },
  resultCanvasRef: { value: HTMLCanvasElement },
  appState: { value: keyof typeof AppState }
) => {
  // Clear state
  imageSrc.value = ""; // Clear any previously captured image
  resultCanvasRef.value.style.display = "none"; // Hide the result canvas from previous capture
  videoRef.value.style.display = "block"; // Make sure the video is visible
  canvasRef.value.style.display = "block"; // Ensure the canvas is visible for new captures

  // Clear the canvases
  const outputCtx = canvasRef.value.getContext("2d", {
    willReadFrequently: true,
  });
  const resultCtx = resultCanvasRef.value.getContext("2d", {
    willReadFrequently: true,
  });
  outputCtx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height); // Clear the output canvas
  resultCtx?.clearRect(
    0,
    0,
    resultCanvasRef.value.width,
    resultCanvasRef.value.height
  ); // Clear the result canvas

  // Transition to streaming state and start the video feed
  startVideoFeed(videoRef, canvasRef, appState, resultCanvasRef);
};
const loadOpenCv = (onComplete: () => void) => {
  const openCvURL = "https://docs.opencv.org/5.x/opencv.js";
  const isScriptPresent = !!document.getElementById("open-cv");

  if (isScriptPresent) {
    onComplete();
  } else {
    const script = document.createElement("script");
    script.id = "open-cv";
    script.async = true;
    script.src = openCvURL;
    script.onload = onComplete;
    document.body.appendChild(script);
  }
};

// Camera initialization
const setVideoAndCanvasDimensions = (
  videoRef: any,
  canvasRef: any,
  resultCanvasRef: any
) => {
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

const initCamera = (
  appState: { value: keyof typeof AppState },
  videoRef: { value: HTMLVideoElement },
  canvasRef: { value: HTMLCanvasElement },
  resultCanvasRef: { value: HTMLCanvasElement },
  constraints: MediaStreamConstraints,
  videoElement: HTMLVideoElement,
  callback: (msg?: string) => void
) => {
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
              setVideoAndCanvasDimensions(videoRef, canvasRef, resultCanvasRef);
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
// Copy video feed to canvas
const copyToCanvas = (
  canvasRef: { value: HTMLCanvasElement },
  videoElement: HTMLVideoElement,
  ctx: CanvasRenderingContext2D,
  scanner: JScanifyType, // assuming scanner is an instance of jscanify
  appState: { value: keyof typeof AppState }
) => {
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
      }
    }
    appState.value == AppState.Streaming && requestAnimationFrame(frame); // Continue processing the next frame
  };
  frame();
};
// Start the video feed
const startVideoFeed = (
  videoRef: { value: HTMLVideoElement },
  canvasRef: { value: HTMLCanvasElement },
  appState: { value: keyof typeof AppState },
  resultCanvasRef: { value: HTMLCanvasElement }
) => {
  const constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  };

  if (!videoRef.value || !canvasRef.value) {
    console.error("Video or canvas references are not available");
    return;
  }
  // Ensure the canvas is cleared before starting the video again
  const ctx = canvasRef.value.getContext("2d", { willReadFrequently: true });
  ctx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  loadOpenCv(() => {
    console.log("OpenCV loaded and ready.");
    initCamera(
      appState,
      videoRef,
      canvasRef,
      resultCanvasRef,
      constraints,
      videoRef.value,
      () => {
        const ctx = canvasRef.value.getContext("2d", {
          willReadFrequently: true,
        });
        if (ctx) {
          const scanner = JScanify();
          copyToCanvas(canvasRef, videoRef.value, ctx, scanner, appState);
        }
      }
    );
  });
};

const applyShadedOverlay = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  cornerPoints: AdjustedCorners
) => {
  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    cornerPoints;

  // Step 1: Draw a path that covers the entire canvas (which we'll shade)
  ctx.beginPath();
  ctx.moveTo(0, 0); // Start at the top-left corner of the canvas
  ctx.lineTo(canvas.width, 0); // Top-right corner
  ctx.lineTo(canvas.width, canvas.height); // Bottom-right corner
  ctx.lineTo(0, canvas.height); // Bottom-left corner
  ctx.closePath(); // Close the canvas path (covering the whole canvas)

  // Step 2: Create a second path for the boundary we want to exclude from shading
  ctx.moveTo(topLeftCorner.x, topLeftCorner.y);
  ctx.lineTo(topRightCorner.x, topRightCorner.y);
  ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y);
  ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
  ctx.closePath(); // Close the path (this is the document boundary)

  // Step 3: Use "even-odd" rule to create the inverse clip
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Set the shade color
  ctx.fill("evenodd"); // Fill the entire canvas, but exclude the inside of the boundary
};

const drawCornerCircles = (
  cornerPoints: AdjustedCorners,
  ctx: CanvasRenderingContext2D
) => {
  // Extract the corners
  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    cornerPoints;

  // Draw a circle at each corner point
  [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner].forEach(
    (corner) => {
      ctx.beginPath();
      ctx.arc(corner.x, corner.y, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 255, 255, 0)"; // Circle color
      ctx.fill();
      ctx.strokeStyle = "white"; // Circle border color
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  );
};

const drawCaptureBoundary = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const srcMat = window.cv.matFromImageData(imageData);
    const scanner = JScanify();

    const contour = scanner.findPaperContour(srcMat);

    if (!contour) {
      console.error("No document found!");
      return;
    }
    const cornerPoints = scanner.getCornerPoints(contour, imageData);
    // Example calculation of boundary box using corner points
    // Extract all corner points
    const {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    } = cornerPoints;

    adjustedCorners.topLeftCorner = topLeftCorner;
    adjustedCorners.topRightCorner = topRightCorner;
    adjustedCorners.bottomLeftCorner = bottomLeftCorner;
    adjustedCorners.bottomRightCorner = bottomRightCorner;
    // Save current canvas state before drawing the shade
    ctx.save();

    // Apply the shaded overlay outside the boundary
    applyShadedOverlay(ctx, canvas, cornerPoints);

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

    // Restore the canvas state
    ctx.restore();
  }
};

const borderingAlgorithm = (
  canvasRef: { value: HTMLCanvasElement },
  borderColor: string = "blue"
) => {
  const canvas = canvasRef.value; // The canvas displaying the video feed
  const ctx = canvas?.getContext("2d", { willReadFrequently: true });
  if (!ctx || !cv) return;
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
    cv.CHAIN_APPROX_SIMPLE
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
const getScaleX = (resultCanvas: any) =>
  resultCanvas.width / resultCanvas.clientWidth;
const getScaleY = (resultCanvas: any) =>
  resultCanvas.height / resultCanvas.clientHeight;

const isInsideCircle = (
  x: number,
  y: number,
  corner: { x: number; y: number }
) => {
  const dx = x - corner.x;
  const dy = y - corner.y;
  console.log(dx * dx + dy * dy <= circleRadius * circleRadius);
  return dx * dx + dy * dy <= circleRadius * circleRadius;
};

// Get the selected corner based on user input
const getSelectedCorner = (x: number, y: number) => {
  const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } =
    adjustedCorners;
  console.log(
    x,
    y,
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner
  );
  // Check if the click/touch was inside one of the corners
  if (isInsideCircle(x, y, topLeftCorner)) return topLeftCorner;
  if (isInsideCircle(x, y, topRightCorner)) return topRightCorner;
  if (isInsideCircle(x, y, bottomLeftCorner)) return bottomLeftCorner;
  if (isInsideCircle(x, y, bottomRightCorner)) return bottomRightCorner;

  return null;
};

const calculateInteractionBoundary = (
  event: MouseEvent | TouchEvent,
  resultCanvas: HTMLCanvasElement
) => {
  const rect = resultCanvas.getBoundingClientRect();
  const scaleX = getScaleX(resultCanvas);
  const scaleY = getScaleY(resultCanvas);
  // let offsetX = 0;
  // let offsetY = 0;
  // Get the mouse click coordinates relative to the canvas

  const positionX =
    event instanceof MouseEvent ? event.layerX : event.touches[0].clientX;
  const positionY =
    event instanceof MouseEvent ? event.layerY : event.touches[0].clientY;
  const x = positionX - rect.left; // * scaleX;
  const y = positionY - rect.top; //* scaleY;
  selectedCorner.value = getSelectedCorner(x, y);
  console.log(positionX, positionY);
  console.log(selectedCorner.value);
  // if (selectedCorner) {
  //   offsetX = x - selectedCorner.x;
  //   offsetY = y - selectedCorner.y;
  // }
};

// Handle mouse down
const onMouseDown =
  (resultCanvas: HTMLCanvasElement) => (event: MouseEvent) => {
    calculateInteractionBoundary(event, resultCanvas);
    redrawCanvasWithAdjustedCorners(resultCanvas);
  };

// Handle mouse move
const onMouseMove =
  (resultCanvas: HTMLCanvasElement) => (event: MouseEvent) => {
    if (selectedCorner.value) {
      calculateInteractionBoundary(event, resultCanvas);
      // Redraw canvas with updated corner positions
      redrawCanvasWithAdjustedCorners(resultCanvas);
    }
  };

// Handle mouse up
const onMouseUp = () => {
  selectedCorner.value = null;
};

// Touch events (similar to mouse events)
const onTouchStart =
  (resultCanvas: HTMLCanvasElement) => (event: MouseEvent) => {
    calculateInteractionBoundary(event, resultCanvas);
    console.log("onTouchStart", selectedCorner.value);
  };

const onTouchMove =
  (resultCanvas: HTMLCanvasElement) => (event: MouseEvent) => {
    calculateInteractionBoundary(event, resultCanvas);

    console.log("onTouchMove", selectedCorner.value);
    // redrawCanvasWithAdjustedCorners(resultCanvas);
  };

const onTouchEnd = () => {
  selectedCorner.value = null;
};

// Function to redraw the canvas with updated corners
const redrawCanvasWithAdjustedCorners = (resultCanvas: HTMLCanvasElement) => {
  const ctx = resultCanvas?.getContext("2d", { willReadFrequently: true });
  ctx?.clearRect(0, 0, resultCanvas.width, resultCanvas.height); // Clear the canvas
  // Redraw the boundary and circles with adjusted corners
  if (resultCanvas && ctx) {
    //   drawCaptureBoundary(resultCanvas, ctx);
  }
};

export {
  adjustedCorners,
  AppState,
  clearStateAndStart,
  drawCaptureBoundary,
  borderingAlgorithm,
  getScaleX,
  getScaleY,
  calculateInteractionBoundary,
  getSelectedCorner,
  onMouseUp,
  onMouseDown,
  onMouseMove,
  onTouchMove,
  onTouchEnd,
  onTouchStart,
};
