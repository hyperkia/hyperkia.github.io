function Index(l) {

  const text = l.text;
  const scaleY = text.transform?.[3] ?? 1;

  // POINT TEXT
  if (text.shapeType === "point" && text.bounds) {
    const rawHeight =
      text.bounds.bottom.value - text.bounds.top.value;

    return rawHeight * scaleY;
  }

  // BOX TEXT (your PSD uses boxBounds)
  if (text.shapeType === "box") {

    // Preferred (most accurate for your structure)
    if (Array.isArray(text.boxBounds)) {
      const rawHeight = text.boxBounds[3] - text.boxBounds[1];
      return rawHeight * scaleY;
    }

    // Fallback if boundingBox exists in other PSDs
    if (text.boundingBox) {
      const rawHeight =
        text.boundingBox.bottom.value -
        text.boundingBox.top.value;

      return rawHeight * scaleY;
    }
  }

  // Final fallback (raster crop height)
  if (typeof l.top === "number" && typeof l.bottom === "number") {
    return l.bottom - l.top;
  }

  return 0;
}

export default Index;