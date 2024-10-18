declare global {
  interface Window {
    Pose: any;
    Camera: any;
  }
}

// Init MediaPipe Pose detection
export const initPoseDetection = async (
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement,
  onResultsCallback: (results: any) => void,
): Promise<void> => {
  if (!window.Pose || !window.Camera) {
    throw new Error(
      "MediaPipe Pose or Camera not loaded. Ensure the scripts are loaded correctly.",
    );
  }

  // Initialize Pose
  const pose = new window.Pose({
    locateFile: (file: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  pose.onResults(onResultsCallback);

  // Initialize Camera
  const camera = new window.Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
  });

  camera.start();
};

// Stop Pose detection and video feed
export const stopPoseDetection = (videoElement: HTMLVideoElement): void => {
  if (videoElement && videoElement.srcObject) {
    const tracks = (videoElement.srcObject as MediaStream).getTracks();
    tracks.forEach((track: MediaStreamTrack) => track.stop());
    videoElement.srcObject = null;
  }
};

// Interfaces for landmarks and drawing options
interface Landmark {
  x: number;
  y: number;
}

interface DrawOptions {
  color: string;
  lineWidth: number;
}

// Draw connectors between landmarks
export const drawConnectors = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  connections: [number, number][],
  options: DrawOptions,
): void => {
  ctx.strokeStyle = options.color;
  ctx.lineWidth = options.lineWidth;

  connections.forEach(([startIdx, endIdx]) => {
    const startLandmark = landmarks[startIdx];
    const endLandmark = landmarks[endIdx];

    if (startLandmark && endLandmark) {
      ctx.beginPath();
      ctx.moveTo(
        startLandmark.x * ctx.canvas.width,
        startLandmark.y * ctx.canvas.height,
      );
      ctx.lineTo(
        endLandmark.x * ctx.canvas.width,
        endLandmark.y * ctx.canvas.height,
      );
      ctx.stroke();
    }
  });
};

// Draw landmarks on the canvas
export const drawLandmarks = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  options: DrawOptions,
): void => {
  ctx.fillStyle = options.color;

  landmarks.forEach((landmark) => {
    ctx.beginPath();
    ctx.arc(
      landmark.x * ctx.canvas.width,
      landmark.y * ctx.canvas.height,
      options.lineWidth,
      0,
      2 * Math.PI,
    );
    ctx.fill();
  });
};
