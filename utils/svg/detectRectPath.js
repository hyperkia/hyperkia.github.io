
function isCollinear(a, b, c, eps = 0.01) {
  return Math.abs(
    (b.x - a.x) * (c.y - a.y) -
    (b.y - a.y) * (c.x - a.x)
  ) < eps;
}

function Index(path) {
  // Split into commands
  const tokens = path.match(/[MLHVCAZ][^MLHVCAZ]*/gi);
  if (!tokens) return null;

  let x = 0, y = 0;
  let startX = 0, startY = 0;

  const segments = [];

  for (const token of tokens) {
    const type = token[0].toUpperCase();
    const nums = token
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);

    switch (type) {
      case "M":
        x = nums[0];
        y = nums[1];
        startX = x;
        startY = y;
        break;

      case "L":
        segments.push({
          type: "line",
          start: { x, y },
          end: { x: nums[0], y: nums[1] }
        });
        x = nums[0];
        y = nums[1];
        break;

      case "H":
        segments.push({
          type: "line",
          start: { x, y },
          end: { x: nums[0], y }
        });
        x = nums[0];
        break;

      case "V":
        segments.push({
          type: "line",
          start: { x, y },
          end: { x, y: nums[0] }
        });
        y = nums[0];
        break;

      case "C": {
        const end = { x: nums[4], y: nums[5] };

        const straight = isCollinear(
          { x, y },
          { x: nums[0], y: nums[1] },
          end
        ) && isCollinear(
          { x, y },
          { x: nums[2], y: nums[3] },
          end
        );

        segments.push({
          type: straight ? "line" : "curve",
          start: { x, y },
          end
        });

        x = end.x;
        y = end.y;
        break;
      }

      case "Z":
        if (x !== startX || y !== startY) {
          segments.push({
            type: "line",
            start: { x, y },
            end: { x: startX, y: startY }
          });
        }
        break;
    }
  }

  const lines = segments.filter(s => s.type === "line");
  const curves = segments.filter(s => s.type === "curve");

  if (lines.length !== 4) return null;

  const pts = segments.flatMap(s => [s.start, s.end]);

  const xs = pts.map(p => p.x);
  const ys = pts.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  let radius = 0;

  if (curves.length) {
    radius = Math.max(
      ...curves.map(c =>
        Math.max(
          Math.abs(c.start.x - c.end.x),
          Math.abs(c.start.y - c.end.y)
        )
      )
    );
  }

  return {
    isRectangle: true,
    isRounded: curves.length > 0,
    width: maxX - minX,
    height: maxY - minY,
    radius
  };
}

export default Index;