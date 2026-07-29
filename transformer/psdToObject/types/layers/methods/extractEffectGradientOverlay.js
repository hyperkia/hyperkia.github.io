const fields = ['align', 'angle', 'scale', 'offset', 'opacity', 'reverse', 'blendMode'];

function getOpacityAt(location, opacityStops) {
    if (!opacityStops || !opacityStops.length) return 1;

    // exact match
    const exact = opacityStops.find(s => s.location === location);
    if (exact) return KIA.utils.number.fixedDigits(exact.opacity);

    // find neighbors
    let left = opacityStops[0];
    let right = opacityStops[opacityStops.length - 1];

    for (let i = 0; i < opacityStops.length - 1; i++) {
        const a = opacityStops[i];
        const b = opacityStops[i + 1];

        if (location >= a.location && location <= b.location) {
            left = a;
            right = b;
            break;
        }
    }

    // interpolate
    const t = (location - left.location) / (right.location - left.location || 1);
    return KIA.utils.number.fixedDigits(left.opacity + (right.opacity - left.opacity) * t);
}

function Index(gradientData) {
    const id = crypto.randomUUID();
    const result = {id};

    fields.forEach((f) => {
        if (f in gradientData) result[f] = gradientData[f];
    });
    if ('type' in gradientData) result.variant = gradientData.type;

    const colorStops = gradientData.gradient.colorStops;
    const opacityStops = gradientData.gradient.opacityStops;

    result.stops = colorStops.map(cs => ({
        location: cs.location,
        rgb: {
            r: Math.round(cs.color.r),
            g: Math.round(cs.color.g),
            b: Math.round(cs.color.b),
        },        
        opacity: getOpacityAt(cs.location, opacityStops)
    }));

    return result;
}

export default Index;