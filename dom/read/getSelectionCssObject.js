function Index() {
	const id = KIA.state.ui.getSelectionId();

	const layerObj = KIA.state.layers.getProp('map')[id];
	if(layerObj) return layerObj.style;

	const pageObj = KIA.state.pages.getProp('map')[id];
	if(pageObj) return pageObj.style;

	if(id === 'canvas') return KIA.state.canvas.getProp('style');
}

export default Index;