
function normalizeDuplicateLayers(dupLayerIds, selectionId){
    const dupLayers = {};
    dupLayerIds.forEach((lId)=>{
        const cloneLayer = structuredClone(KIA.nodesMap[lId]);        
        cloneLayer.newId = crypto.randomUUID();
        dupLayers[lId] = cloneLayer;
    });

    for(const [id, lObj] of Object.entries(dupLayers)) {               
        lObj.id = lObj.newId;
        // Parent        
        if(id !== selectionId) lObj.parent = dupLayers[lObj.parent].newId;
        // children
        lObj.children.forEach((c,i)=>{
            if(dupLayers[c]) lObj.children[i] = dupLayers[c].newId;
        })
    }

    return dupLayers;
}

 
function Index(id) {
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;
    const duplicateNotAllowTagName = KIA.state.config.getProp('svgShapes');

    let layerObj = KIA.nodesMap[id];
    if(duplicateNotAllowTagName.includes(layerObj.tagName)) {
        layerObj = KIA.dom.read.getClosestDuplicateAllowTagNameLayerObj(layerObj);
        id = layerObj.id;
    }
    
    const parentId = layerObj.parent;
    const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentId);
    const duplicateLayerIds = KIA.dom.read.getLayerTreeChildrensById(id);
    const duplicateLayerObjs = normalizeDuplicateLayers(duplicateLayerIds, id);
    const selectionNewId = duplicateLayerObjs[id].id;
 
    KIA.state.ui.setDirtyMap({
        layer: {        	
            id: selectionNewId,
        	flag: 'duplicatePasteLayer',
        }
    });

    KIA.state.layers.duplicateLayer(Object.values(duplicateLayerObjs));
    KIA.services.idb.core.addObject('layers', Object.values(duplicateLayerObjs));

    const layerParentObj = KIA.nodesMap[parentId];

    if(parentObjectStore === 'pages') {
        KIA.state.pages.addNewLayerAsChild(selectionNewId);
        KIA.services.idb.core.replaceObjectByKey('pages', layerParentObj);    
    } else if(parentObjectStore === 'layers') {
        KIA.state.layers.addNewLayerAsChild(selectionNewId);
        KIA.services.idb.core.replaceObjectByKey('layers', layerParentObj);    
    }
    
    KIA.state.ui.resetDirtyMap();

    const ids = new Set().add(selectionNewId);
    KIA.actions.share.setSelectionIds(ids);
    return selectionNewId;
}

export default Index; 