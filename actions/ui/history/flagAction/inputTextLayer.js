
const Handler = {
	item: null,
	selectionId: '',

	undo(){		
		const lObj = KIA.nodesMap[this.item.selectionId];
		lObj.textContent = this.item.undo.selectionTextContent;
		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);
	},
	
	redo(){
		const lObj = KIA.nodesMap[this.item.selectionId];
		lObj.textContent = this.item.redo.selectionTextContent;
		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);
	},

}

function Index(item, action){	
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler[action]();
}

export default Index;






