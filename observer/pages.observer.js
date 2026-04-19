
const Index = {
	observe(payload) {
		this[payload]();
	},

	renderPageList() {
		KIA.dom.kiaPages.createPage();
		KIA.dom.kiaLayers.createPage();
		KIA.dom.kiaCanvas.createPage();
		KIA.dom.kiaCanvas.createPageName();
		KIA.dom.kiaCanvas.setPageNamePosition();
	},

	setTitle() {
		KIA.dom.kiaCanvas.setSelectionPageTitle();
		KIA.dom.kiaLayers.setSelectionPageTitle();
	},

	deleteLayers(){
		KIA.dom.kiaCanvas.deleteSelectedPage();
		KIA.dom.kiaPages.deleteSelectedPage();
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaCanvas.setPageNamePosition();
	},

	setStyle(){
		KIA.dom.kiaCanvas.updatePageSelectionStyle();
	},

	addLayerToParent(){
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaLayers.updateLayersPanel();
	}
} 

export default Index; 