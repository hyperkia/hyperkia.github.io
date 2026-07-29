
const Handler = {
	item: null,
	selectionId: '',
	targetObjectStore: '',

	undo(){
		this['undo'+this.targetObjectStore]();
	},

	undopages(){		
		const layers = [];
		const pages = [];

		for(let [id, obj] of Object.entries(this.item.undo.restorePageLayersObj)) {
			KIA.nodesMap[id] = structuredClone(obj);
			if(['svg','html'].includes(obj.instanceof)) layers.push(structuredClone(obj));
			if(obj.instanceof === 'document') pages.push(structuredClone(obj));
		}
		
		KIA.services.idb.core.replaceObjectsByKey('layers', Object.values(layers));
		KIA.services.idb.core.replaceObjectsByKey('pages', Object.values(pages));

		const canvasChildren = {children: structuredClone(this.item.undo.canvasChildren)};
		KIA.state.canvas.setProp(canvasChildren)
		KIA.services.idb.core.updateKeyValueObject('canvas', canvasChildren);

		KIA.dom.kiaPages.createPage();
		KIA.dom.kiaLayers.createPage();
		KIA.dom.kiaCanvas.createPage();
		KIA.dom.kiaCanvas.createPageName();
		KIA.dom.kiaCanvas.setPageNamePosition();
		KIA.dom.kiaCanvas.renderLayers();

		const ids = new Set().add(this.selectionId);
        KIA.actions.share.setSelectionIds(ids);
	},
	
	redo(){
		this['redo'+this.targetObjectStore]();
	},

	redopages(){
		const layers = [];
		const pages = [];

		this.item.redo.deletePageLayersIds.forEach((lId)=>{
			const nObj = KIA.nodesMap[lId];
			if(['svg','html'].includes(nObj.instanceof)) layers.push(lId);
			if(nObj.instanceof === 'document') pages.push(lId);
			delete KIA.nodesMap[lId];
		})

		KIA.services.idb.core.deleteObjects('layers', layers);		
		KIA.services.idb.core.deleteObjects('pages', pages);

		const canvasChildren = {children: structuredClone(this.item.redo.canvasChildren)};
		KIA.state.canvas.setProp(canvasChildren)
		KIA.services.idb.core.updateKeyValueObject('canvas', canvasChildren);

		KIA.dom.kiaCanvas.deletePagesById(this.selectionId);
		KIA.dom.kiaPages.deletePagesById(this.selectionId);
		KIA.dom.kiaLayers.deletePagesById(this.selectionId);		
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

