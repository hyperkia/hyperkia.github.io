function Index(){

	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;

	if(dirtyLayer.source === 'kiaLayers') return;
	if(dirtyLayer.flag !== 'reparent' ) return;

	const layerId = dirtyLayer.id;
	const layerObj = KIA.nodesMap[layerId];
	const layerEl = KIA.layersRefMap[layerId];
	const parentObj = KIA.nodesMap[layerObj.parent];
	let parentEl = KIA.layersRefMap[parentObj.id];

	const layerIndex = parentObj.children.indexOf(layerId);
	const prevIndex = layerIndex - 1;
	
	KIA.layersRefMap[layerId].remove();
	delete KIA.layersRefMap[layerId];

	KIA.dom.kiaLayers.createSelectionNode();
	KIA.dom.kiaLayers.updateLayersPanel();
}

export default Index;

