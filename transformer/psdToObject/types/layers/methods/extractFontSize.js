function Index(layer, fallback = 16) {

	const fontSize = layer?.text?.style?.fontSize;
	const transform = layer?.text?.transform;

	// Invalid values
	if (
		fontSize === undefined ||
		fontSize === null ||
		Number.isNaN(fontSize)
	) {
		return fallback + 'px';
	}

	let size = Number(fontSize);

	// Photoshop transform matrix
	// [ a, b, c, d, tx, ty ]
	if (
		Array.isArray(transform) &&
		transform.length >= 4
	) {

		const a = transform[0];
		const b = transform[1];
		const c = transform[2];
		const d = transform[3];

		const scaleX = Math.sqrt(a * a + b * b);
		const scaleY = Math.sqrt(c * c + d * d);

		// Text mainly follows vertical scale
		const scale = scaleY || scaleX || 1;

		size *= scale;
	}

	// Safety
	if (!Number.isFinite(size) || size <= 0) {
		size = fallback;
	}

	return parseFloat(size.toFixed(3)) + 'px';
}

export default Index;