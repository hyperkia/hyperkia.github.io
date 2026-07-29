function Index(id, gradientData) {
  const svgNS = "http://www.w3.org/2000/svg";

  const lg = document.createElementNS(svgNS, "linearGradient");
  lg.setAttribute("id", id);

  const { angle = 0, scale = 1, stops = [] } = gradientData;

  // ✅ Use userSpace for better control
  lg.setAttribute("gradientUnits", "objectBoundingBox");

  // 🔥 STEP 1: PSD angle → CSS angle
  // PSD 0° = bottom→top
  // CSS/SVG 0° = left→right
  const rad = (angle + 90) * Math.PI / 180;

  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);

  // 🔥 STEP 2: Use FULL diagonal (important)
  const len = Math.abs(dx) + Math.abs(dy);

  let x1 = 0.5 - dx / len / 2;
  let y1 = 0.5 - dy / len / 2;
  let x2 = 0.5 + dx / len / 2;
  let y2 = 0.5 + dy / len / 2;

  // 🔥 STEP 3: Apply PSD scale (center-based compression)
  if (scale !== 1) {
    const t = 1 / scale;

    x1 = 0.5 + (x1 - 0.5) * t;
    y1 = 0.5 + (y1 - 0.5) * t;
    x2 = 0.5 + (x2 - 0.5) * t;
    y2 = 0.5 + (y2 - 0.5) * t;
  }

  lg.setAttribute("x1", x1);
  lg.setAttribute("y1", y1);
  lg.setAttribute("x2", x2);
  lg.setAttribute("y2", y2);

  // 🔥 STEP 4: Stops (critical fix)
  stops.forEach(stop => {
    const s = document.createElementNS(svgNS, "stop");

    const { location, rgb, opacity = 1, hexa } = stop;

    // clamp (PSD sometimes gives weird floats)
    const offset = Math.min(1, Math.max(0, location));

    s.setAttribute("offset", `${offset * 100}%`);
    s.setAttribute(
      "stop-color",
      `${hexa}`
    );
    s.setAttribute("stop-opacity", opacity);

    lg.appendChild(s);
  });

  return lg;
}

export default Index;