
const Index = {

	observe(payload) {
		this[payload]();
	},

	renderLayers() {
		KIA.dom.kiaCanvas.renderLayers();		
	},

	importLayers(){
		KIA.dom.kiaCanvas.renderPagesLayers();
	},

	setLayerDirtyFlagToPropField() {
		KIA.dom.share.setLayerDirtyFlagToPropField();
	},

	setCssPropToLayer(){
		KIA.dom.share.setCssPropToLayer();
	},

	setTextContent(){
		KIA.dom.kiaCanvas.updateDirtyLayerTextContent();
		KIA.dom.kiaCssTag.updateDirtyLayerTextContent();
	},

	setNodeName(){
		KIA.dom.kiaCanvas.updateDirtyLayerNodeName();
	},

	deleteLayers(){
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaCanvas.deleteDirtyLayer();
		KIA.dom.kiaLayers.updateLayersPanel();
	},

	setSelectionZIndex(){
		KIA.dom.kiaCanvas.updateSelectionZIndex();
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
	},

	setSelectionSCss(){
		KIA.dom.kiaCanvas.updateLayerSelectionSCss();
	},

	renderPsdLayers(){
		KIA.dom.kiaCanvas.renderPsdLayers();
	},

	moveLayerInTree(){
		KIA.dom.kiaLayers.moveLayerInTree();
		KIA.dom.kiaCanvas.moveLayerInTree();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
	},
} 

export default Index;