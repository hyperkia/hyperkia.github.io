function Index(fill = {}) {

	if (!fill.enabled || !fill.gradient) {
		return {};
	}

	const gradient = fill.gradient;
	const colorStops = gradient.colorStops || [];
	const opacityStops = gradient.opacityStops || [];

	// Get opacity by location
	function getOpacity(location) {
		const stop = opacityStops.find(s => s.location === location);
		return stop ? stop.opacity : 1;
	}

	// Convert stop → rgba()
	const stops = colorStops.map(stop => {

		const { r, g, b } = stop.color;
		const opacity = getOpacity(stop.location);

		const red = Math.round(r);
		const green = Math.round(g);
		const blue = Math.round(b);

		const position = stop.location * 100;

		return `rgba(${red}, ${green}, ${blue}, ${opacity}) ${position}%`;

	});

	// Photoshop angle → CSS angle
	// Photoshop 0deg = bottom → top
	// CSS 0deg = top → bottom
	const cssAngle = (fill.angle + 90) % 360;

	let gradientCSS = '';

	switch (fill.type) {

		case 'radial':
			gradientCSS = `radial-gradient(circle, ${stops.join(', ')})`;
			break;

		case 'linear':
		default:
			gradientCSS = `linear-gradient(${cssAngle}deg, ${stops.join(', ')})`;
			break;

	}

	// Reverse
	if (fill.reverse) {
		const reversed = [...stops].reverse();
		gradientCSS = `linear-gradient(${cssAngle}deg, ${reversed.join(', ')})`;
	}

	return {
		'background-image': gradientCSS,
		'-webkit-background-clip': 'text',
		'background-clip': 'text',
		color: 'transparent',
		'-webkit-text-fill-color': 'transparent'
	};

}

export default Index;