function Index() {
	const key = KIA.state.layers.pointerLockKey;
	const layerObj = KIA.state.layers.map[key];
	const layerEl = KIA.kiaCanvas._qs(`[data-layer="${key}"]`);
	layerEl.dataset.lock = layerObj.css['pointer-events'];
}

export default Index;