
const Handler = {
	item: null,
	selectionId: '',

	undo(){		
		delete KIA.nodesMap[this.selectionId];

		const parentObj = KIA.nodesMap[this.item.undo.parentId];
		const selectionIndex = parentObj.children.indexOf(this.selectionId);
		parentObj.children.splice(selectionIndex, 1);
		const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentObj.id);
		KIA.services.idb.core.replaceObjectByKey(parentObjectStore, parentObj);		
		KIA.services.idb.core.deleteObjects('layers', this.selectionId);

		KIA.dom.kiaCanvas.deleteLayersById(this.selectionId);
		KIA.dom.kiaLayers.deleteLayersById(this.selectionId);
		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.actions.share.resetSelectionId();
	},
	
	redo(){
		KIA.nodesMap[this.selectionId] = structuredClone(this.item.redo.newElementObj);
		const elementObj = KIA.nodesMap[this.selectionId];

		const parentObj = KIA.nodesMap[elementObj.parent];
		parentObj.children.push(this.selectionId);
		const parentObjObjectStore = KIA.dom.read.getObjectStoreNameById(parentObj.id);
		KIA.services.idb.core.replaceObjectByKey(parentObjObjectStore, parentObj);

		KIA.services.idb.core.replaceObjectByKey('layers', elementObj);

		KIA.dom.kiaCanvas.recoverDeletedLayersById(this.selectionId);
		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},

}

function Index(item, action){	
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler[action]();
}

export default Index;






