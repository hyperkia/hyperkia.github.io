
let debounceTimeout = null;

function Index(newLayerObj){
    if(Object.keys(newLayerObj.style).length === 0) return;
    KIA.state.ui.setDirtyMap({
        layer: {
            id: newLayerObj.id,
            style: Object.keys(newLayerObj.style),
            flag: 'style',
            computed: newLayerObj.computed,
        }
    }); 
    
    delete newLayerObj.computed;

    KIA.state.layers.setStyle(newLayerObj);
    KIA.state.ui.resetDirtyMap();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const layerObj = KIA.nodesMap[newLayerObj.id];
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);    	
    }, 150);
}

export default Index;