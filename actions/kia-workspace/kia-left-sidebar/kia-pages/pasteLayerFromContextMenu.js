
function normalizeCopyLayers(copyLayerIds, copyLayerId, position){
    const selectionObj = KIA.nodesMap[KIA.state.ui.getSelectionId()];    
    const copyLayerParentEl = KIA.dom.read.getClosestParentAbleHtmlNode(KIA.canvasRefMap[selectionObj.id]);
    const copyLayers = {};

    // New Id
    copyLayerIds.forEach((lId)=>{
        const cloneLayer = structuredClone(KIA.nodesMap[lId]);        
        cloneLayer.newId = crypto.randomUUID();
        copyLayers[lId] = cloneLayer;
    });

    // parent children Id
    for(const [id, lObj] of Object.entries(copyLayers)) {               
        lObj.id = lObj.newId;
        if(id === copyLayerId) {
            const parentId = copyLayerParentEl.dataset.page;
            lObj.parent = parentId;            
        } else {
            lObj.parent = copyLayers[lObj.parent].newId;
        }
        lObj.children.forEach((c,i)=>{
            if(copyLayers[c]) lObj.children[i] = copyLayers[c].newId;
        })
    }

    // position
    const xy = KIA.dom.read.getCanvasElementScaleCoords({e: position, element: copyLayerParentEl});
    copyLayers[copyLayerId].style.left = xy.x+'px';
    copyLayers[copyLayerId].style.top = xy.y+'px';

    return copyLayers;
}
 
function Index(position) {
	const copyLayerId = KIA.state.ui.getProp('copy').layer;
	if(!copyLayerId) return;
    if(KIA.dom.read.getObjectStoreNameById(copyLayerId) !== 'layers') return;

    const copyLayerObj = KIA.nodesMap[copyLayerId];
    const selectionId = KIA.state.ui.getSelectionId();
    const parentId = KIA.dom.read.getClosestParentAbleHtmlNode(KIA.canvasRefMap[selectionId]).dataset.page;    
    const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentId);
    const copyLayerIds = KIA.dom.read.getLayerTreeChildrensById(copyLayerId);
    const copyLayerObjs = normalizeCopyLayers(copyLayerIds, copyLayerId, position);
    const copyNewLayerId = copyLayerObjs[copyLayerId].id;

    KIA.state.ui.setDirtyMap({
        layer: {        	
            id: copyNewLayerId,
        	flag: 'duplicatePasteLayer',

        }
    })

    KIA.state.layers.pasteLayer(Object.values(copyLayerObjs));
    KIA.services.idb.core.addObject('layers', Object.values(copyLayerObjs));

    const layerParentObj = KIA.nodesMap[parentId];

    if(parentObjectStore === 'pages') {
        KIA.state.pages.addNewLayerAsChild(copyNewLayerId);
        KIA.services.idb.core.replaceObjectByKey('pages', layerParentObj);    
    } else if(parentObjectStore === 'layers') {
        KIA.state.layers.addNewLayerAsChild(copyNewLayerId);
        KIA.services.idb.core.replaceObjectByKey('layers', layerParentObj);    
    }
    
    KIA.state.ui.resetDirtyMap();

    const ids = new Set().add(copyNewLayerId);
    KIA.actions.share.setSelectionIds(ids);
}

export default Index;