

const Handler = {
	item: null,
	selectionId: '',
	targetObjectStore: '',

	undo(){
		this['undo'+this.targetObjectStore]();
	},

	undolayers(){
		const layerObj = KIA.nodesMap[this.selectionId];
		Object.assign(layerObj.style, this.item.undo.selectionStyle);
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);
		KIA.dom.kiaCanvas.selectionLayerResizeController();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},

	undopages(){

	},

	undocanvas(){

	},
	
	redo(){
		this['redo'+this.targetObjectStore]();
	},

	redolayers(){
		const layerObj = KIA.nodesMap[this.selectionId];
		Object.assign(layerObj.style, this.item.redo.selectionStyle);
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);
		KIA.dom.kiaCanvas.selectionLayerResizeController();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},

	redopages(){

	},

	redocanvas(){

	},
}

function Index(item, action){		
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler.targetObjectStore = KIA.dom.read.getObjectStoreNameById(item.selectionId);
	Handler[action]();
}

export default Index;






		