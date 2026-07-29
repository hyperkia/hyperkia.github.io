function Index(layer) {

	const style = layer?.text?.style || {};
	const transform = layer?.text?.transform;

	let fontSize = Number(style.fontSize || 16);
	let leading = style.leading;

	// Auto-leading
	if (
		style.autoLeading ||
		leading === undefined ||
		leading === null
	) {
		leading = fontSize * 1.2;
	}

	let lineHeight = Number(leading);

	// Photoshop transform scaling
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

		const scale = scaleY || scaleX || 1;

		fontSize *= scale;
		lineHeight *= scale;
	}

	// If line-height smaller than font-size
	// add extra spacing
	if (lineHeight < fontSize) {
		lineHeight = fontSize + 10;
	}

	// Safety
	if (
		!Number.isFinite(lineHeight) ||
		lineHeight <= 0
	) {
		lineHeight = fontSize * 1.2;
	}

	return parseFloat(
		lineHeight.toFixed(3)
	) + 'px';
}

export default Index;