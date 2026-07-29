const fields = ['style', 'angle', 'dither', 'smoothness', 'name'];

function getOpacityAt(location, opacityStops) {
    if (!opacityStops?.length) return 1;

    // Exact match
    const exact = opacityStops.find(s => s.location === location);
    if (exact) return KIA.utils.number.fixedDigits(exact.opacity);

    // Find surrounding stops
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

    // Linear interpolation
    const t = (location - left.location) / (right.location - left.location || 1);
    return KIA.utils.number.fixedDigits(
        left.opacity + (right.opacity - left.opacity) * t
    );
}

function Index(vectorFill) {
    if (!vectorFill?.colorStops?.length) return null;

    const id = crypto.randomUUID();
    const result = {
        id,
        variant: vectorFill.style || 'linear'
    };

    fields.forEach(field => {
        if (field in vectorFill) result[field] = vectorFill[field];
    });

    result.stops = vectorFill.colorStops.map(cs => ({
        location: cs.location,
        rgb: {
            r: Math.round(cs.color.r),
            g: Math.round(cs.color.g),
            b: Math.round(cs.color.b)
        },
        opacity: getOpacityAt(cs.location, vectorFill.opacityStops)
    }));

    return result;
}

export default Index;