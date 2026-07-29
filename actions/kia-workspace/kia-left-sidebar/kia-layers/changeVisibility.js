 
function Index(id){
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;
    const layerObj = KIA.nodesMap[id];
	let visibility = layerObj.style.visibility || 'inherit';
	visibility = visibility === 'inherit' ? 'hidden' : 'inherit';

	const newLayerObj = {
        id,
        style: {
            visibility,
        }
    };
	
	KIA.state.ui.setDirtyMap({
        layer: {
            id: newLayerObj.id,
            style: Object.keys(newLayerObj.style),
            flag: 'style',
            flagType: 'lockVisibility',
        }
    });

    KIA.state.layers.setStyle(newLayerObj);
    KIA.state.ui.resetDirtyMap();

    KIA.services.idb.core.replaceObjectByKey('layers', layerObj);

    KIA.actions.share.resetSelectionId();
}

export default Index;