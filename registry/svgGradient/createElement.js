function Index(id, gradientData) {
  const svgNS = "http://www.w3.org/2000/svg";
  const lg = document.createElementNS(svgNS, "linearGradient");

  lg.setAttribute("id", id);
  lg.setAttribute("gradientUnits", "objectBoundingBox");

  const rad = (gradientData.angle * Math.PI) / 180;

  const x1 = 50 - Math.cos(rad) * 50;
  const y1 = 50 + Math.sin(rad) * 50;
  const x2 = 50 + Math.cos(rad) * 50;
  const y2 = 50 - Math.sin(rad) * 50;

  lg.setAttribute("x1", x1 + "%");
  lg.setAttribute("y1", y1 + "%");
  lg.setAttribute("x2", x2 + "%");
  lg.setAttribute("y2", y2 + "%");

  // Create lookup for opacity by offset
  const opacityMap = new Map();
  (gradientData.opacityStops || []).forEach(os => {
    opacityMap.set(os.offset, os.opacity);
  });

  gradientData.colorStops.forEach(cs => {
    const stop = document.createElementNS(svgNS, "stop");

    stop.setAttribute("offset", cs.offset + "%");
    stop.setAttribute(
      "stop-color",
      `rgb(${cs.r},${cs.g},${cs.b})`
    );

    // Apply opacity if exists, otherwise default 1
    const opacity = opacityMap.has(cs.offset)
      ? opacityMap.get(cs.offset)
      : 1;

    stop.setAttribute("stop-opacity", opacity);

    lg.appendChild(stop);
  });

  return lg;
}

export default Index;