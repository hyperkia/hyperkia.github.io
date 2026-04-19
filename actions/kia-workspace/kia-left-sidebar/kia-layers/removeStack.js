function Index(newLayerObj){
	KIA.state.layers.removeStack(newLayerObj);
    
    newLayerObj.style = KIA.dom.read.getStackStyleById(newLayerObj.id);
    KIA.state.ui.setDirtyMap({
        layer: {
            id: newLayerObj.id,
            style: Object.keys(newLayerObj.style),
            flag: 'style',
        }
    });
    KIA.state.layers.setStyle(newLayerObj);
    KIA.state.ui.resetDirtyMap();
    
    const layerObj = KIA.nodesMap[newLayerObj.id];
    KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
}

export default Index;