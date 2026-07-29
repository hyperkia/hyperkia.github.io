function Index(layer) {

	const top = Number(layer?.top);
	const bottom = Number(layer?.bottom);

	// Safety
	if (
		!Number.isFinite(top) ||
		!Number.isFinite(bottom)
	) {
		return 'auto';
	}

	const height = bottom - top;

	if (height <= 0) {
		return 'auto';
	}

	return parseFloat(
		height.toFixed(3)
	) + 'px';
}

export default Index;