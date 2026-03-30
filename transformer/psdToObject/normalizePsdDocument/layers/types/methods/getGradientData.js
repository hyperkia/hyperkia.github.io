function Index(overlay) {
    if (!overlay || !overlay.enabled) return null;

    // Convert PSD angle → CSS angle
    const cssAngle = (450 - (overlay.angle ?? 0)) % 360;

    // Extract color stops
    const colorStops = (overlay.gradient ?.colorStops || []).map(stop => ({
        offset: +(stop.location * 100).toFixed(2),
        r: Math.round(stop.color.r),
        g: Math.round(stop.color.g),
        b: Math.round(stop.color.b)
    }));

    // Extract opacity stops (Photoshop transparency)
    const opacityStops = (overlay.gradient ?.opacityStops || []).map(stop => ({
        offset: +(stop.location * 100).toFixed(2),
        opacity: +stop.opacity.toFixed(3)
    }));

    // Reverse stops if needed
    if (overlay.reverse) {
        colorStops.reverse();
        opacityStops.reverse();
    }

    return {
        type: overlay.type, // "linear" or "radial"
        angle: cssAngle,
        blendMode: overlay.blendMode,
        opacity: overlay.opacity,
        scale: overlay.scale,
        colorStops,
        opacityStops
    };
}

export default Index;