
const Handler = {
	item: null,
	selectionId: '',

	undo(){
		const undoData = this.item.undo;
		KIA.nodesMap[this.selectionId] = structuredClone(undoData.selectionObj);
		KIA.nodesMap[undoData.selectionParentObj.id] = structuredClone(undoData.selectionParentObj);
		delete KIA.nodesMap[undoData.groupLayerId];

		KIA.dom.kiaCanvas.resetLayerToUngroup(this.selectionId);
		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},
	
	redo(){
		const redoData = this.item.redo;
		KIA.nodesMap[this.selectionId] = structuredClone(redoData.selectionObj);
		KIA.nodesMap[redoData.selectionParentObj.id] = structuredClone(redoData.selectionParentObj);
		KIA.nodesMap[redoData.groupLayerObj.id] = structuredClone(redoData.groupLayerObj);

		KIA.dom.kiaCanvas.resetLayerToGroup(this.selectionId);
		KIA.dom.kiaLayers.updateLayersPanel();
		KIA.dom.kiaLayers.updateNodeChildrenLength();

		const ids = new Set().add(redoData.groupLayerObj.id);
        KIA.actions.share.setSelectionIds(ids);
	},

}

function Index(item, action){	
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler[action]();
}

export default Index;






