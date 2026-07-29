
let debounceTimeout = null;

function Index(newLayerObj) {
	KIA.state.ui.setDirtyMap({
		layer: {
			id: newLayerObj.id,
			style: Object.keys(newLayerObj.style),
			flag: 'style',
			flagType: 'moving',
			source: newLayerObj.source
		}
	});
	KIA.state.layers.movingLayer(newLayerObj);
	KIA.state.ui.resetDirtyMap();
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	const layerObj = KIA.nodesMap[newLayerObj.id];
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
    }, 150);
	
}

export default Index;