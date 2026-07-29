function Index(css) {
  const match = css.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;

  let [r, g, b, a] = match[1].split(",").map(v => v.trim());

  r = parseInt(r);
  g = parseInt(g);
  b = parseInt(b);

  const toHex = v => v.toString(16).padStart(2, "0");

  let hex = "#" + toHex(r) + toHex(g) + toHex(b);

  if (a !== undefined) {
    a = Math.round(parseFloat(a) * 255);
    hex += toHex(a);
  }

  return hex;
}

export default Index;