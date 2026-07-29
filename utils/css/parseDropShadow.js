function Index(filter = '') {
	if (!filter || filter === 'none') return [];

	const matches = [...filter.matchAll(/drop-shadow\(([^()]*(?:\([^()]*\)[^()]*)*)\)/gi)];

	return matches.map(match => {
		const value = match[1];

		const parts = value.match(
			/rgba?\([^)]+\)|hsla?\([^)]+\)|#[\da-f]+|-?\d*\.?\d+\w+|[a-z]+/gi
		) || [];

		const lengths = parts.filter(v => /^-?\d/.test(v));

		const color = parts.find(v =>
			/^(rgba?|hsla?)\(|#|[a-z]/i.test(v)
		) || 'currentColor';

		return {
			offsetX: parseInt(lengths[0] || '0'),
			offsetY: parseInt(lengths[1] || '0'),
			blur: parseInt(lengths[2] || '0'),
			color: KIA.utils.color.rgbaStringToHexa(
				KIA.utils.color.normalizeColor(color)
			),
		};
	});
}

export default Index;