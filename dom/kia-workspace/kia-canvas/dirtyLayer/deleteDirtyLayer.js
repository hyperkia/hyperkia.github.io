function Index() {
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'deleteLayer') return;

	const layerEl = KIA.kiaCanvas._qs(`[data-layer="${dirtyLayer.id}"]`);
	layerEl.remove();
}

export default Index;