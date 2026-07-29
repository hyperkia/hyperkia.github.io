function Index(element) {
  const style = getComputedStyle(element);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

  const text = element.textContent;

  const width = Math.ceil(ctx.measureText(text).width) + 50;
  const height = parseFloat(style.fontSize) * 2;

  canvas.width = width;
  canvas.height = height;

  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "alphabetic";

  const baseline = height * 0.8;
  ctx.fillText(text, 25, baseline);

  const data = ctx.getImageData(0, 0, width, height).data;

  let left = width;
  let right = 0;

  for (let x = 0; x < width; x++) {
    let found = false;

    for (let y = 0; y < height; y++) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        found = true;
        break;
      }
    }

    if (found) {
      left = Math.min(left, x);
      right = Math.max(right, x);
    }
  }

  return {
    leftBearing: left - 25,
    rightBearing: width - right - 1
  };
}

export default Index;