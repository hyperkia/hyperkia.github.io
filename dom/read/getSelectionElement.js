function Index() {
	const id = KIA.state.ui.getSelectionId();

	const layerEl = KIA.kiaCanvas._qs(`[data-layer="${id}"]`);
	if(layerEl) return layerEl;

	const pageEl = KIA.kiaCanvas._qs(`[data-page="${id}"]`);
	if(pageEl) return pageEl;

	if(id === 'canvas') return KIA.kiaCanvas;
}

export default Index;