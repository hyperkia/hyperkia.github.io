function Index(layer) {

	// Prefer actual rendered bounds
	const left = Number(layer?.left);
	const right = Number(layer?.right);

	// Safety
	if (
		!Number.isFinite(left) ||
		!Number.isFinite(right)
	) {
		return 'auto';
	}

	const width = right - left;

	if (width <= 0) {
		return 'auto';
	}

	return parseFloat(
		width.toFixed(3)
	) + 'px';
}

export default Index;