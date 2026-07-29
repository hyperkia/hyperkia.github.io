
function normalizeHex(hex) {
  hex = hex.replace("#", "");

  // #RGB
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(c => c + c)
      .join("");
  }

  // #RGBA
  else if (hex.length === 4) {
    hex = hex
      .split("")
      .map(c => c + c)
      .join("");
  }

  return `#${hex.toUpperCase()}`;
}

function browserColorToHex(color) {
  const div = document.createElement("div");
  div.style.color = color;

  document.body.appendChild(div);

  try {
    return KIA.utils.color.rgbaStringToHexa(getComputedStyle(div).color);
  } finally {
    div.remove();
  }
}

function normalizeColorToHex(color) {
  if (!color) return null;

  color = color.trim();

  // -------------------------
  // HEX
  // -------------------------
  if (color.startsWith("#")) {
    return normalizeHex(color);
  }

  // -------------------------
  // RGB / RGBA
  // -------------------------
  if (color.startsWith("rgb")) {
    return KIA.utils.color.rgbaStringToHexa(color);
  }

  // -------------------------
  // Fallback
  // color names, hsl, etc.
  // -------------------------
  return browserColorToHex(color);
}

export default normalizeColorToHex;