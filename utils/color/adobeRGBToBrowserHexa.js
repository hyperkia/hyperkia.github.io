const ADOBE_GAMMA = 2.19921875;

function Index(rgbArg) {
	rgbArg = rgbArg.indexOf?.('#')===0?KIA.utils.color.hexaToRgbaObj(rgbArg):rgbArg;

  // Normalize
  let ar = rgbArg.r / 255;
  let ag = rgbArg.g / 255;
  let ab = rgbArg.b / 255;

  // Adobe RGB -> Linear
  ar = Math.pow(ar, ADOBE_GAMMA);
  ag = Math.pow(ag, ADOBE_GAMMA);
  ab = Math.pow(ab, ADOBE_GAMMA);

  // Linear Adobe RGB -> XYZ (D65)
  const X = ar * 0.5767309 + ag * 0.1855540 + ab * 0.1881852;
  const Y = ar * 0.2973769 + ag * 0.6273491 + ab * 0.0752741;
  const Z = ar * 0.0270343 + ag * 0.0706872 + ab * 0.9911085;

  // XYZ -> Linear sRGB
  let sr =  3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
  let sg = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z;
  let sb =  0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;

  // Linear -> sRGB
  function encode(c) {
    c = Math.max(0, Math.min(1, c));

    if (c <= 0.0031308) {
      return 12.92 * c;
    }

    return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  }

  const rgb = {
    r: Math.round(encode(sr) * 255),
    g: Math.round(encode(sg) * 255),
    b: Math.round(encode(sb) * 255),
  };

  return KIA.utils.color.rgbToHex(rgb);
}

export default Index;