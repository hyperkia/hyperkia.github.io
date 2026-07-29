function Index() {
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'textContent') return;
	if(dirtyLayer.source === 'kiaCanvas') return;

	const layerObj = KIA.nodesMap[dirtyLayer.id];
	const textLayerEl = KIA.canvasRefMap[dirtyLayer.id];
	textLayerEl.innerHTML = layerObj.textContent;
}

export default Index;