function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;

	const layerObj = KIA.state.layers.map[key];
	if(layerObj) return layerObj.css;

	const pageObj = KIA.state.pages.map[key];
	if(pageObj) return pageObj.css;

	if(key === 'canvas') return KIA.state.canvas.css;
}

export default Index;