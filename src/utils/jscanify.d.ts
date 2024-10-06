// src/utils/jscanify.d.ts
declare module "@utils/jscanify" {
  // Interface for JScanify instance
  export interface JScanify {
    highlightPaper(
      image: HTMLImageElement | HTMLCanvasElement,
      options?: { color?: string; thickness?: number }
    ): HTMLCanvasElement;
    extractPaper(
      image: HTMLImageElement | HTMLCanvasElement,
      resultWidth: number,
      resultHeight: number,
      cornerPoints?: {
        topLeftCorner: { x: number; y: number };
        topRightCorner: { x: number; y: number };
        bottomLeftCorner: { x: number; y: number };
        bottomRightCorner: { x: number; y: number };
      }
    ): HTMLCanvasElement;
    findPaperContour(img: cv.Mat): cv.Mat | null;
    getCornerPoints(
      contour: cv.Mat,
      img: cv.Mat
    ): {
      topLeftCorner: { x: number; y: number };
      topRightCorner: { x: number; y: number };
      bottomLeftCorner: { x: number; y: number };
      bottomRightCorner: { x: number; y: number };
    };
  }

  // Factory function that returns JScanify instance
  export const JScanify: () => JScanify;
}
