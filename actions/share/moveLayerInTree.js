function Index(data){

	const dropObj = KIA.nodesMap[data.dropTarget];
	const dragObj = KIA.nodesMap[data.dragTarget];
	const dragOldParentObj = KIA.nodesMap[dragObj.parent];
	const dropParentObj = KIA.nodesMap[dropObj.parent];

	// delete from old location
	const deleteIndex = dragOldParentObj.children.indexOf(dragObj.id);
	if (deleteIndex !== -1) dragOldParentObj.children.splice(deleteIndex, 1);

	// add to new location
	if(data.position === 'before') {
		const index = dropParentObj.children.indexOf(dropObj.id);
		if (index !== -1) {
		  dropParentObj.children.splice(index, 0, dragObj.id);
		}
		dragObj.parent = dropObj.parent;		
	}

	if(data.position === 'after') {
		const index = dropParentObj.children.indexOf(dropObj.id);
		if (index !== -1) {
		  dropParentObj.children.splice(index + 1, 0, dragObj.id);
		}
		dragObj.parent = dropObj.parent;
	}

	if(data.position === 'inside') {
	
		dropObj.children.push(dragObj.id);
		dragObj.parent = dropObj.id;
	}

	const dragNewParentObj = KIA.nodesMap[dragObj.parent];
	dragObj.style.left = (parseInt(dragObj.style.left) * parseInt(dragNewParentObj.style.width)) / parseInt(dragOldParentObj.style.width)+'px';
	dragObj.style.top = (parseInt(dragObj.style.top) * parseInt(dragNewParentObj.style.height)) / parseInt(dragOldParentObj.style.height)+'px';

	const newObjects = [...new Set([dropObj, dragObj, dragOldParentObj, dropParentObj])];
	const newLayersObj = [];
	const newPagesObj = [];

	newObjects.forEach((o)=>{
		if(!o) return;
		if(o.instanceof === 'document') {
			newPagesObj.push(o);
			return;
		}
		newLayersObj.push(o);
	});

	newPagesObj.length && KIA.services.idb.core.replaceObjectsByKey('pages', newPagesObj);
	newLayersObj.length && KIA.services.idb.core.replaceObjectsByKey('layers', newLayersObj);

	KIA.state.ui.setDirtyMap({
		layer: {
			id: dragObj.id,
			flag: 'reparent',
			source: data.source,
		}
	});

	KIA.state.layers.moveLayerInTree();
}

export default Index;