
const selectionPasteCount = {};

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

    if(selectionPasteCount[selectionId]) selectionPasteCount[selectionId] += 20;;
    if(!selectionPasteCount[selectionId]) selectionPasteCount[selectionId] = 20;

    const selectionLayerStyle = dupLayers[selectionId].style;
    selectionLayerStyle.left = parseInt(selectionLayerStyle.left) + selectionPasteCount[selectionId] + 'px';
    selectionLayerStyle.top = parseInt(selectionLayerStyle.top) + selectionPasteCount[selectionId] + 'px';

    return dupLayers;
}

 
function Index() {
    const id = KIA.state.ui.getProp('copy').layer;

    if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;

    const layerObj = KIA.nodesMap[id];
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
    })

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
}

export default Index; 