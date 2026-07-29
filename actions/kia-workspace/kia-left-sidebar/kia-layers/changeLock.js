
function Index(id){
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;
    const layerObj = KIA.nodesMap[id];
	let pointerEvents = layerObj.style['pointer-events'] || 'inherit';
	pointerEvents = pointerEvents === 'none' ? 'inherit' : 'none';

	const newLayerObj = {
        id,
        style: {
            'pointer-events': pointerEvents
        }
    };
	
	KIA.state.ui.setDirtyMap({
        layer: {
            id,
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