function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;

	const layerEl = KIA.kiaCanvas._qs(`[data-layer="${key}"]`);
	if(layerEl) return layerEl;

	const pageEl = KIA.kiaCanvas._qs(`[data-page="${key}"]`);
	if(pageEl) return pageEl;

	if(key === 'canvas') return KIA.kiaCanvas;
}

export default Index;