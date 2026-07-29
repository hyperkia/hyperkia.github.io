
const Handler = {
	item: null,
	selectionId: '',
	targetObjectStore: '',

	undo(){
		this['undo'+this.targetObjectStore]();
	},

	undolayers(){
		const layerObj = KIA.nodesMap[this.selectionId];

		const newParentObj = structuredClone(this.item.undo.newParentObj);
		KIA.nodesMap[newParentObj.id] = newParentObj;
		const childIndex = newParentObj.children.indexOf(this.selectionId);
		newParentObj.children.splice(childIndex, 1);
		const newParentObjectStore = KIA.dom.read.getObjectStoreNameById(newParentObj.id);
		KIA.services.idb.core.replaceObjectByKey(newParentObjectStore, newParentObj);

		const oldParentObj = structuredClone(this.item.undo.oldParentObj);		
		KIA.nodesMap[oldParentObj.id] = oldParentObj;
		const oldParentObjectStore = KIA.dom.read.getObjectStoreNameById(oldParentObj.id);
		KIA.services.idb.core.replaceObjectByKey(oldParentObjectStore, oldParentObj);

		Object.assign(layerObj.style, this.item.undo.selectionStyle);
		layerObj.parent = oldParentObj.id;				
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);

		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);
		KIA.dom.kiaCanvas.selectionLayerResizeController();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaLayers.updateLayersPanel();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},

	redo(){
		this['redo'+this.targetObjectStore]();
	},

	redolayers(){
		const layerObj = KIA.nodesMap[this.selectionId];
 
		const oldParentObj = structuredClone(this.item.redo.oldParentObj);
		const childIndex = oldParentObj.children.indexOf(this.selectionId);
		oldParentObj.children.splice(childIndex, 1);
		KIA.nodesMap[oldParentObj.id] = oldParentObj;
		const oldParentObjectStore = KIA.dom.read.getObjectStoreNameById(oldParentObj.id);
		KIA.services.idb.core.replaceObjectByKey(oldParentObjectStore, oldParentObj);

		const newParentObj = structuredClone(this.item.redo.newParentObj);
		KIA.nodesMap[newParentObj.id] = newParentObj;
		const newParentObjectStore = KIA.dom.read.getObjectStoreNameById(newParentObj.id);
		KIA.services.idb.core.replaceObjectByKey(newParentObjectStore, newParentObj);

		Object.assign(layerObj.style, this.item.redo.selectionStyle);
		layerObj.parent = newParentObj.id;				
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);

		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);
		KIA.dom.kiaCanvas.selectionLayerResizeController();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaLayers.updateLayersPanel();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},
}

function Index(item, action){		
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler.targetObjectStore = KIA.dom.read.getObjectStoreNameById(item.selectionId);
	Handler[action]();
}

export default Index;






