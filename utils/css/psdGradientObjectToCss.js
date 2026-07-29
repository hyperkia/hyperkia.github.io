function Index(obj) {
    if (!obj || obj.type !== "gradient") {
        throw new Error("Invalid gradient object");
    }

    // Copy stops so we don't mutate the original
    let stops = [...obj.stops];

    // Reverse stops if requested
    if (obj.reverse) {
        stops = stops
            .map(stop => ({
                ...stop,
                location: 1 - stop.location
            }))
            .reverse();
    }

    const cssStops = stops
        .map(stop => {
            const { r, g, b } = stop.rgb;
            const a = stop.opacity ?? 1;
            const pos = stop.location * 100;

            return `rgba(${r}, ${g}, ${b}, ${a}) ${pos}%`;
        })
        .join(", ");

    switch (obj.variant) {
        case "linear":
            return `linear-gradient(${obj.angle}deg, ${cssStops})`;

        case "radial":
            return `radial-gradient(circle, ${cssStops})`;

        default:
            throw new Error(`Unsupported gradient variant: ${obj.variant}`);
    }
}

export default Index;