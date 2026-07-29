
function normalizePageLayers(ids){
	const dup = {};

    ids.forEach((id)=>{
        const cloneObj = structuredClone(KIA.nodesMap[id]);        
        cloneObj.newId = crypto.randomUUID();
        dup[id] = cloneObj;
    });

    for(const [id, dupObj] of Object.entries(dup)) { 

    	if(dupObj.parent) {
    		dupObj.parent = dup[dupObj.parent].newId;
    	}

        dupObj.id = dupObj.newId;
        dupObj.children.forEach((c,i)=>{
            if(dup[c]) dupObj.children[i] = dup[c].newId;
        });
    }

    return dup;
}

function Index(id){
	if(KIA.dom.read.getObjectStoreNameById(id) !== 'pages') return;

	const pageObj = KIA.nodesMap[id];
    const pageLayers = KIA.dom.read.getLayerTreeChildrensById(id);
    const norPageLayers = normalizePageLayers(pageLayers);
    
    KIA.state.ui.setDirtyMap({
        page: {        	
            id,
        	flag: 'duplicatePage',
        }
    });

    const dupLayers = [];
    const dupPages = [];

    for(let [objId, obj] of Object.entries(norPageLayers)) {
    	if(obj.tagName) {
    		dupLayers.push(obj);
    		continue;
    	}
    	if(obj.instanceof === "document") dupPages.push(obj);
    }

    KIA.state.canvas.addDuplicatePagesIdAsChildren(dupPages, id);
    KIA.state.pages.duplicatePages(dupPages);
    KIA.state.layers.duplicatePageLayers(dupLayers);

    const canvasChildren = KIA.state.canvas.getProp('children');
    KIA.services.idb.core.updateKeyValueObject('canvas', { children: canvasChildren });
    KIA.services.idb.core.addObject('pages', dupPages);
    KIA.services.idb.core.addObject('layers', dupLayers);
}

export default Index;
 