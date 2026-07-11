export function drawFrameCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasW / canvasH;

  let drawW: number;
  let drawH: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = img.width * (canvasH / img.height);
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = img.height * (canvasW / img.width);
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}
