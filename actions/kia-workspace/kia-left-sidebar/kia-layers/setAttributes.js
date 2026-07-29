
let debounceTimeout = null;

function Index(newLayerObj){
    KIA.state.ui.setDirtyMap({
        layer: {
            id: newLayerObj.id,
            attributes: Object.keys(newLayerObj.attributes),
            flag: 'attributes',
        }
    });
    KIA.state.layers.setAttributes(newLayerObj);
    KIA.state.ui.resetDirtyMap();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const layerObj = KIA.nodesMap[newLayerObj.id];
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);    	
    }, 150);
}

export default Index;