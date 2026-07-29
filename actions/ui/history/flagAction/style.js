
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
		Object.assign(layerObj.attributes, this.item.undo.selectionAttributes);
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);

		let ids = new Set().add(this.selectionId);
		KIA.state.ui.setSelectionIds(ids);
		KIA.kiaApp.dispatchEvent(new CustomEvent('selectionChange', {
		  bubbles: true,
		  composed: true,
		  detail: {},
		}));
	},

	undopages(){
		const pageObj = KIA.nodesMap[this.selectionId];
		Object.assign(pageObj.style, this.item.undo.selectionStyle);
		KIA.services.idb.core.replaceObjectByKey('pages', pageObj);
		KIA.dom.kiaCanvas.resetPageById(this.selectionId);
	},

	undocanvas(){
		const canvasStyle = KIA.state.canvas.getProp('style');
		Object.assign(canvasStyle, this.item.undo.selectionStyle);
		KIA.services.idb.core.updateKeyValueObject('canvas', {style: canvasStyle});
		KIA.dom.kiaCanvas.resetCanvas();
	},
	
	redo(){
		this['redo'+this.targetObjectStore]();
	},

	redolayers(){
		const layerObj = KIA.nodesMap[this.selectionId];
		Object.assign(layerObj.style, this.item.redo.selectionStyle);
		Object.assign(layerObj.attributes, this.item.redo.selectionAttributes);
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
		KIA.dom.kiaCanvas.resetLayerById(this.selectionId);

		let ids = new Set().add(this.selectionId);
		KIA.state.ui.setSelectionIds(ids);
		KIA.kiaApp.dispatchEvent(new CustomEvent('selectionChange', {
		  bubbles: true,
		  composed: true,
		  detail: {},
		}));
	},

	redopages(){
		const pageObj = KIA.nodesMap[this.selectionId];
		Object.assign(pageObj.style, this.item.redo.selectionStyle);
		KIA.services.idb.core.replaceObjectByKey('pages', pageObj);
		KIA.dom.kiaCanvas.resetPageById(this.selectionId);
	},

	redocanvas(){
		const canvasStyle = KIA.state.canvas.getProp('style');
		Object.assign(canvasStyle, this.item.redo.selectionStyle);
		KIA.services.idb.core.updateKeyValueObject('canvas', {style: canvasStyle});
		KIA.dom.kiaCanvas.resetCanvas();
	},
}

function Index(item, action){
	Handler.item = item;
	Handler.selectionId = item.selectionId;
	Handler.targetObjectStore = KIA.dom.read.getObjectStoreNameById(item.selectionId);
	Handler[action]();
}

export default Index;






