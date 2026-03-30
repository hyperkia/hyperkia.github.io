function Index(l) {
  const paths = l.vectorMask?.paths;
  if (!Array.isArray(paths)) return "";

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  // --------- PASS 1: CALCULATE BOUNDS ----------
  for (const path of paths) {
    if (!path.knots) continue;

    for (const knot of path.knots) {
      const pts = knot.points;
      if (!pts || pts.length < 6) continue;

      const [inX, inY, anchorX, anchorY, outX, outY] = pts;

      const xs = [inX, anchorX, outX];
      const ys = [inY, anchorY, outY];

      for (let i = 0; i < 3; i++) {
        minX = Math.min(minX, xs[i]);
        minY = Math.min(minY, ys[i]);
        maxX = Math.max(maxX, xs[i]);
        maxY = Math.max(maxY, ys[i]);
      }
    }
  }

  if (!isFinite(minX)) return "";

  const width = KIA.utils.number.cleanNumber(maxX - minX);
  const height = KIA.utils.number.cleanNumber(maxY - minY);

  let d = "";

  // --------- PASS 2: BUILD NORMALIZED PATH ----------
  for (const path of paths) {
    if (!path.knots || !path.knots.length) continue;

    const knots = path.knots;

    const firstPts = knots[0].points;
    if (!firstPts || firstPts.length < 6) continue;

    const [, , firstAnchorX, firstAnchorY] = firstPts;

    d += `M ${KIA.utils.number.cleanNumber(firstAnchorX - minX)} ${KIA.utils.number.cleanNumber(firstAnchorY - minY)} `;

    for (let i = 1; i < knots.length; i++) {
      const prev = knots[i - 1].points;
      const curr = knots[i].points;

      if (!prev || !curr || prev.length < 6 || curr.length < 6) continue;

      const [, , , , prevOutX, prevOutY] = prev;
      const [currInX, currInY, currAnchorX, currAnchorY] = curr;

      d += `C ${KIA.utils.number.cleanNumber(prevOutX - minX)} ${KIA.utils.number.cleanNumber(prevOutY - minY)}, 
             ${KIA.utils.number.cleanNumber(currInX - minX)} ${KIA.utils.number.cleanNumber(currInY - minY)}, 
             ${KIA.utils.number.cleanNumber(currAnchorX - minX)} ${KIA.utils.number.cleanNumber(currAnchorY - minY)} `;
    }

    // Close curve properly
    const last = knots[knots.length - 1].points;
    const first = knots[0].points;

    if (last && first && last.length >= 6 && first.length >= 6) {
      const [, , , , lastOutX, lastOutY] = last;
      const [firstInX, firstInY] = first;

      d += `C ${KIA.utils.number.cleanNumber(lastOutX - minX)} ${KIA.utils.number.cleanNumber(lastOutY - minY)}, 
             ${KIA.utils.number.cleanNumber(firstInX - minX)} ${KIA.utils.number.cleanNumber(firstInY - minY)}, 
             ${KIA.utils.number.cleanNumber(firstAnchorX - minX)} ${KIA.utils.number.cleanNumber(firstAnchorY - minY)} `;
    }

    d += "Z ";
  }

  return {
    d: d.trim(),
    viewBox: `0 0 ${width} ${height}`,
    left: minX,   // store original position (important for Hyperkia layer state)
    top: minY,
    width, height,
  };
}

export default Index;
