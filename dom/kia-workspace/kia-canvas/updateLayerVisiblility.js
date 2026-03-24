function Index() {
	const key = KIA.state.layers.visibilityKey;
	const layerObj = KIA.state.layers.map[key];
	const layerEl = KIA.kiaCanvas._qs(`[data-layer="${key}"]`);
	layerEl.dataset.visibility = layerObj.css.visibility;
}

export default Index;