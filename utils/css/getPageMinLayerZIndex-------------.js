function Index(pageId) {

	const layers = KIA.state.layers.getProp('map');
	let zIndex = [0];

	for(let lId in layers) {
		const l = layers[lId];
		if(l.pId === pageId) zIndex.push(+l.css['z-index']);

	}

	return Math.min(...zIndex);
}

export default Index;