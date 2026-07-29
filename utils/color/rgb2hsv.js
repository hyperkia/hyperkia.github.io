function Index(rgb) {
    // Step 1 - Normalize
    const normRGB = {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
    }

    // Step 2 - Min, Max, Delta
    const min = Math.min(...Object.values(normRGB));
    const max = Math.max(...Object.values(normRGB));
    const delta = (max - min);

    // Step 3 - V & S
    const v = Math.round(max * 100);
    const s = Math.round((max == 0 ? 0 : delta / max) * 100);

    // Step 4 - H
    let h = 0;
    if (max == normRGB.r) h = 60 * ((normRGB.g - normRGB.b) / delta);
    if (max == normRGB.g) h = 60 * ((normRGB.b - normRGB.r) / delta + 2);
    if (max == normRGB.b) h = 60 * ((normRGB.r - normRGB.g) / delta + 4);
    if (delta == 0) h = 0;
    if (h < 0) h += 360;
    h = Math.round(h)

    return { h, s, v };
}

export default Index;