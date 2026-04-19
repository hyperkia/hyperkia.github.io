 
function Index(id) {
    const layerObj = KIA.nodesMap[id];
    const parentId = layerObj.parent;
    const layerParentObj = KIA.nodesMap[parentId];
    const deleteLayerIds = KIA.dom.read.getLayerTreeChildrensById(id);

    KIA.state.ui.setDirtyMap({
        layer: {
        	id,
        	flag: 'deleteLayer',
        }
    })
    // Page
    if(layerParentObj.instanceof === 'document') {
        KIA.state.pages.deleteLayerAsChildren(id);
        KIA.services.idb.core.replaceObjectByKey('pages', layerParentObj);    
    } else {
    // Layer
        KIA.state.layers.deleteLayerAsChildren(id);
        KIA.services.idb.core.replaceObjectByKey('layers', layerParentObj);    
    }


    KIA.state.layers.deleteLayers(deleteLayerIds);
    KIA.services.idb.core.deleteObjects('layers', deleteLayerIds);
    
    KIA.state.ui.resetDirtyMap();
}

export default Index; 