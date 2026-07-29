function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;

	if(dirtyLayer.source === 'kiaLayers') return;
	if(dirtyLayer.flag !== 'reparent' ) return;

	const layerId = dirtyLayer.id;
	
	KIA.layersRefMap[layerId].remove();
	delete KIA.layersRefMap[layerId];

	KIA.dom.kiaLayers.createSelectionNode();
	KIA.dom.kiaLayers.updateLayersPanel();
}

export default Index;

