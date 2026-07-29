function Index(filter = '') {
	if (!filter || filter === 'none') return [];

	const filters = [];

	const regex = /([a-z-]+)\(([^()]*(?:\([^()]*\)[^()]*)*)\)/gi;

	for (const match of filter.matchAll(regex)) {
		const name = match[1];
		if(name === 'drop-shadow') continue;
		// ignore color functions
		if (
			name === 'rgb' ||
			name === 'rgba' ||
			name === 'hsl' ||
			name === 'hsla'
		) continue;

		const raw = match[2].trim();

		const amount = parseFloat(raw);
		const unit = raw.replace(amount, '');

		filters.push({
			name,
			value: {
				amount,
				unit: unit.trim()
			}
		});
	}

	return filters;
}

export default Index;