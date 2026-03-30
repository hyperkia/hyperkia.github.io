function Index(hex) {

  const rgba = {r:0, g:0, b:0, a: 1,}

  hex = hex.replace('#', '');

  // Expand short hex (#abc → #aabbcc)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  rgba.r = parseInt(hex.slice(0, 2), 16);
  rgba.g = parseInt(hex.slice(2, 4), 16);
  rgba.b = parseInt(hex.slice(4, 6), 16);

  // No alpha → return rgb
  if (hex.length === 6) {
    return rgba;
  }

  // With alpha → return rgba
  if (hex.length === 8) {
    rgba.a = (parseInt(hex.slice(6, 8), 16) / 255).toFixed(3);
    return rgba;
  }

  return rgba;
}

export default Index;