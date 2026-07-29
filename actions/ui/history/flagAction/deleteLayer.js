
const Handler = {
	item: null,
	selectionId: '',
	targetObjectStore: '',

	undo(){
		this['undo'+this.targetObjectStore]();
	},

	undolayers(){		
		for(let [lId, lObj] of Object.entries(this.item.undo.restoreLayersObj)) {
			KIA.nodesMap[lId] = structuredClone(lObj);
		}
		const parentObj = structuredClone(this.item.undo.parentObj);
		KIA.nodesMap[parentObj.id] = parentObj;
		KIA.dom.kiaCanvas.recoverDeletedLayersById(this.selectionId);
		KIA.services.idb.core.replaceObjectsByKey('layers', Object.values(this.item.undo.restoreLayersObj));
		const parentObjObjectStore = KIA.dom.read.getObjectStoreNameById(parentObj.id);
		KIA.services.idb.core.replaceObjectByKey(parentObjObjectStore, parentObj);

		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},
	
	redo(){
		this['redo'+this.targetObjectStore]();
	},

	redolayers(){
		this.item.redo.deleteLayersId.forEach((lId)=>{
			delete KIA.nodesMap[lId];
		})

		const parentObj = structuredClone(this.item.redo.parentObj);
		KIA.nodesMap[parentObj.id] = parentObj;		
		const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentObj.id);

		KIA.services.idb.core.replaceObjectByKey(parentObjectStore, parentObj);
		KIA.services.idb.core.deleteObjects('layers', this.item.redo.deleteLayersId);

		KIA.dom.kiaCanvas.deleteLayersById(this.selectionId);
		KIA.dom.kiaLayers.deleteLayersById(this.selectionId);
		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
	},

}

function Index(item, action){	
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler.selectionObj = item.selectionObj;
	Handler.targetObjectStore = KIA.dom.read.getObjectStoreNameById(item.selectionObj);
	Handler[action]();
}

export default Index;






