 
function Index(id) {
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;
    
    const layerObj = KIA.nodesMap[id];
    const parentId = layerObj.parent;
    const layerParentObj = KIA.nodesMap[parentId];
    const deleteLayerIds = KIA.dom.read.getLayerTreeChildrensById(id);

    const deletedLayersObj = {};
    deleteLayerIds.forEach(id => deletedLayersObj[id]=structuredClone(KIA.nodesMap[id]));
    KIA.actions.ui.history.addItem({
        flag: 'deleteLayer',
        selectionId: id,
        selectionObj: structuredClone(layerObj),
        undo: {
            restoreLayersObj: structuredClone(deletedLayersObj),
            parentObj: structuredClone(layerParentObj),
        },
        redo: {
            deleteLayersId: structuredClone(deleteLayerIds),
            parentObj: structuredClone(layerParentObj),
        }        
    });

    KIA.state.ui.setDirtyMap({
        layer: {
        	id,
        	flag: 'deleteLayer',
        }
    });
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
    KIA.actions.share.resetSelectionId();
}

export default Index; 