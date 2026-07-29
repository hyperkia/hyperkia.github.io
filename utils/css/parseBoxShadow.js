function Index(shadow = '') {
	if (!shadow || shadow === 'none') return [];

	return shadow.match(/(?:[^,(]|\([^)]*\))+/g).map(s => {
		const inset = s.includes('inset');

		const parts = s.match(
			/rgba?\([^)]+\)|hsla?\([^)]+\)|#[\da-f]+|inset|-?\d*\.?\d+\w+|[a-z]+/gi
		);

		const lengths = parts.filter(v => /^-?\d/.test(v));
		const color = parts.find(v =>
			/^(rgba?|hsla?)\(|#|[a-z]/i.test(v) && v !== 'inset'
		) || 'currentColor';

		return {
			inset,
			offsetX: parseInt(lengths[0] || '0'),
			offsetY: parseInt(lengths[1] || '0'),
			blur: parseInt(lengths[2] || '0'),
			spread: parseInt(lengths[3] || '0'),
			color: KIA.utils.color.rgbaStringToHexa(KIA.utils.color.normalizeColor(color)),
		};
	});
}

export default Index;
