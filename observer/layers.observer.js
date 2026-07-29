
const Index = {

	observe(payload) {
		this[payload]();
	},

	loadLayers() {
		KIA.dom.kiaCanvas.renderLayers();
	},

	importLayers(){
		KIA.dom.kiaCanvas.renderPagesLayers();
	},

	movingLayer() {
		KIA.dom.share.updateDirtyLayerPropFields();
		KIA.dom.kiaCanvas.updateDirtyLayerStyle();		

		KIA.dom.kiaCanvas.selectionLayerResizeController();
    	KIA.dom.kiaCanvas.createSelectionLayersOutline();
	},

	creatingElement(){
		KIA.dom.share.updateDirtyLayerPropFields();
	},

	resizeLayer(){
		KIA.dom.share.updateDirtyLayerPropFields();
	},

	setTextContent(){
		KIA.dom.kiaCanvas.updateDirtyLayerTextContent();
		KIA.dom.kiaCssTag.updateDirtyLayerTextContent();
	},

	setTagName(){
		KIA.dom.kiaCanvas.updateDirtyLayerTagName();
	},

	deleteLayers(){
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaCanvas.deleteDirtyLayer();
		KIA.dom.kiaLayers.updateLayersPanel();
	},

	addLayerToParent(){
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaLayers.updateLayersPanel();
	},

	setAttributes(){
		KIA.dom.kiaCanvas.updateDirtyLayerAttributes();
	}, 

	setStyle(){
		KIA.dom.kiaCanvas.updateDirtyLayerStyle();
		KIA.dom.share.setDirtyComputedToPropFields();
		KIA.dom.kiaLayers.updateDirtyLayerLockVisibility();
	},

	renderLayersMissFonts(){
		KIA.dom.kiaCanvas.renderLayersMissFonts();
	},

	moveLayerInTree(){
		KIA.dom.kiaLayers.moveDirtyLayerInTree();
		KIA.dom.kiaCanvas.moveDirtyLayerInTree();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
	},

	updateChildrenOrder(){
		KIA.dom.kiaLayers.updateChildrenOrder();
	},

	duplicateLayer(){
		KIA.dom.kiaCanvas.renderDuplicatePasteLayer();
	},

	pasteLayer(){
		KIA.dom.kiaCanvas.renderDuplicatePasteLayer();
	},

	createGroupLayer(){
		KIA.dom.kiaCanvas.renderDirtyGroupLayer();
	},
} 

export default Index;