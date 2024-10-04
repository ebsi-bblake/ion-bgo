export const JScanify = () => {
  const cv = window.cv;

  /**
   * Calculates distance between two points. Each point must have `x` and `y` property.
   * @param {*} p1 point 1
   * @param {*} p2 point 2
   * @returns distance between two points
   */
  const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

  /**
   * Finds the contour of the paper within the image.
   * @param img image to process (cv.Mat)
   * @returns the biggest contour inside the image
   */
  const findPaperContour = (img) => {
    const imgGray = new cv.Mat();
    cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY);

    const imgBlur = new cv.Mat();
    cv.GaussianBlur(
      imgGray,
      imgBlur,
      new cv.Size(5, 5),
      0,
      0,
      cv.BORDER_DEFAULT
    );

    const imgThresh = new cv.Mat();
    cv.threshold(imgBlur, imgThresh, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);

    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();

    cv.findContours(
      imgThresh,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );

    let maxArea = 0;
    let maxContourIndex = -1;
    for (let i = 0; i < contours.size(); ++i) {
      const contourArea = cv.contourArea(contours.get(i));
      if (contourArea > maxArea) {
        maxArea = contourArea;
        maxContourIndex = i;
      }
    }

    const maxContour = contours.get(maxContourIndex);

    imgGray.delete();
    imgBlur.delete();
    imgThresh.delete();
    contours.delete();
    hierarchy.delete();

    return maxContour;
  };

  /**
   * Highlights the paper detected inside the image.
   * @param image image to process
   * @param options options for highlighting. Accepts `color` and `thickness` parameter
   * @returns `HTMLCanvasElement` with original image and paper highlighted
   */
  const highlightPaper = (image, options = {}) => {
    options.color = options.color || "orange";
    options.thickness = options.thickness || 10;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = cv.imread(image);

    const maxContour = findPaperContour(img);
    cv.imshow(canvas, img);

    if (maxContour) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner,
      } = getCornerPoints(maxContour, img);

      if (
        topLeftCorner &&
        topRightCorner &&
        bottomLeftCorner &&
        bottomRightCorner
      ) {
        ctx.strokeStyle = options.color;
        ctx.lineWidth = options.thickness;
        ctx.beginPath();
        ctx.moveTo(topLeftCorner.x, topLeftCorner.y);
        ctx.lineTo(topRightCorner.x, topRightCorner.y);
        ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y);
        ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
        ctx.lineTo(topLeftCorner.x, topLeftCorner.y);
        ctx.stroke();
      }
    }

    img.delete();
    return canvas;
  };

  /**
   * Extracts and undistorts the image detected within the frame.
   * @param image image to process
   * @param resultWidth desired result paper width
   * @param resultHeight desired result paper height
   * @param cornerPoints optional custom corner points, in case automatic corner points are incorrect
   * @returns `HTMLCanvasElement` containing undistorted image
   */
  const extractPaper = (image, resultWidth, resultHeight, cornerPoints) => {
    const canvas = document.createElement("canvas");
    const img = cv.imread(image);

    const maxContour = findPaperContour(img);
    const {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    } = cornerPoints || getCornerPoints(maxContour, img);

    const warpedDst = new cv.Mat();
    const dsize = new cv.Size(resultWidth, resultHeight);

    const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
      topLeftCorner.x,
      topLeftCorner.y,
      topRightCorner.x,
      topRightCorner.y,
      bottomLeftCorner.x,
      bottomLeftCorner.y,
      bottomRightCorner.x,
      bottomRightCorner.y,
    ]);

    const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
      0,
      0,
      resultWidth,
      0,
      0,
      resultHeight,
      resultWidth,
      resultHeight,
    ]);

    const M = cv.getPerspectiveTransform(srcTri, dstTri);
    cv.warpPerspective(
      img,
      warpedDst,
      M,
      dsize,
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar()
    );

    cv.imshow(canvas, warpedDst);

    img.delete();
    warpedDst.delete();

    return canvas;
  };

  /**
   * Calculates the corner points of a contour.
   * @param contour contour from {@link findPaperContour}
   * @returns object with properties `topLeftCorner`, `topRightCorner`, `bottomLeftCorner`, `bottomRightCorner`, each with `x` and `y` property
   */
  const getCornerPoints = (contour, img) => {
    const rect = cv.minAreaRect(contour);
    const center = rect.center;

    let topLeftCorner;
    let topRightCorner;
    let bottomLeftCorner;
    let bottomRightCorner;

    for (let i = 0; i < contour.data32S.length; i += 2) {
      const point = { x: contour.data32S[i], y: contour.data32S[i + 1] };
      const dist = distance(point, center);
      if (point.x < center.x && point.y < center.y) {
        if (!topLeftCorner || dist > distance(topLeftCorner, center))
          topLeftCorner = point;
      } else if (point.x > center.x && point.y < center.y) {
        if (!topRightCorner || dist > distance(topRightCorner, center))
          topRightCorner = point;
      } else if (point.x < center.x && point.y > center.y) {
        if (!bottomLeftCorner || dist > distance(bottomLeftCorner, center))
          bottomLeftCorner = point;
      } else if (point.x > center.x && point.y > center.y) {
        if (!bottomRightCorner || dist > distance(bottomRightCorner, center))
          bottomRightCorner = point;
      }
    }

    return {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    };
  };

  // Return the functions as part of the public API
  return {
    highlightPaper,
    extractPaper,
    findPaperContour,
    getCornerPoints,
  };
};
