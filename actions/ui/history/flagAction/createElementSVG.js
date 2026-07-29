
const Handler = {
	item: null,
	selectionId: '',

	undo(){
		const deletedIds = this.item.undo.createdIds;
		deletedIds.forEach((id)=>{
			delete KIA.nodesMap[id];	
		})

		const parentObj = KIA.nodesMap[this.item.undo.parentId];
		const selectionIndex = parentObj.children.indexOf(this.selectionId);
		parentObj.children.splice(selectionIndex, 1);
		const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentObj.id);
		KIA.services.idb.core.replaceObjectByKey(parentObjectStore, parentObj);		
		KIA.services.idb.core.deleteObjects('layers', deletedIds);

		KIA.dom.kiaCanvas.deleteLayersById(this.selectionId);
		KIA.dom.kiaLayers.deleteLayersById(this.selectionId);
		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.actions.share.resetSelectionId();
	},
	
	redo(){
		this.item.redo.newElementsObj.forEach((obj)=>{
			KIA.nodesMap[obj.id] = structuredClone(obj);	
		});

		const selectionObj = KIA.nodesMap[this.selectionId];
		const parentObj = KIA.nodesMap[selectionObj.parent];
		parentObj.children.push(this.selectionId);
		const parentObjObjectStore = KIA.dom.read.getObjectStoreNameById(parentObj.id);
		KIA.services.idb.core.replaceObjectByKey(parentObjObjectStore, parentObj);
		KIA.services.idb.core.replaceObjectsByKey('layers', this.item.redo.newElementsObj);

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






