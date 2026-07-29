function Index(id){
	if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;

	const layerObj = KIA.nodesMap[id];
    const groupNotAllowTgName = KIA.state.config.getProp('svgShapes');
    if(groupNotAllowTgName.includes(layerObj.tagName)) return;
    const layerParentObj = KIA.nodesMap[layerObj.parent];
    const selectionIndex = layerParentObj.children.indexOf(id);    

	const groupLayerObj = {
        id: crypto.randomUUID(),
        parent: layerObj.parent,
        tagName: 'DIV',
        title: 'Group',
        attributes: {},
        style: {
        	left: layerObj.style.left,
        	top: layerObj.style.top,
        	width: layerObj.style.width,
        	height: layerObj.style.height,
        }, 
        children: [layerObj.id],
        instanceof: 'html',
        stack: [],
    };

    const historyItem = {
        flag: 'groupLayer',
        selectionId: id,
        undo: {
            selectionObj: structuredClone(layerObj),
            selectionParentObj: structuredClone(layerParentObj),
            groupLayerId: groupLayerObj.id,
        }
    };

    layerParentObj.children[selectionIndex] = groupLayerObj.id;
    layerObj.style.left = '0px';
	layerObj.style.top = '0px';
	layerObj.parent = groupLayerObj.id;

    historyItem.redo = {
        selectionObj: structuredClone(layerObj),
        selectionParentObj: structuredClone(layerParentObj),
        groupLayerObj: structuredClone(groupLayerObj),
    };

	KIA.state.ui.setDirtyMap({
        layer: {
        	id,
        	flag: 'groupLayer',
        }
    });
    KIA.state.layers.createGroupLayer(groupLayerObj);
    KIA.state.ui.resetDirtyMap();

    const layerParentObjectStore = KIA.dom.read.getObjectStoreNameById(layerParentObj.id);
    KIA.services.idb.core.replaceObjectByKey(layerParentObjectStore, layerParentObj);
    KIA.services.idb.core.replaceObjectsByKey('layers', [layerObj, groupLayerObj]);

    const ids = new Set().add(groupLayerObj.id);
    KIA.actions.share.setSelectionIds(ids);

    KIA.actions.ui.history.addItem(historyItem);
}

export default Index;