function Index(id) {
	if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;
	const parentId = KIA.nodesMap[id].parent;
	const parentObj = KIA.nodesMap[parentId];
	const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentId);
	
	KIA.state.ui.setDirtyMap({
        layer: {
            id: parentId,
            flag: 'childrenOrder',
        }
    });
	KIA.state.layers.sendToBack(id);
	KIA.state.ui.resetDirtyMap();
	KIA.services.idb.core.replaceObjectByKey(parentObjectStore, parentObj);
}

export default Index;