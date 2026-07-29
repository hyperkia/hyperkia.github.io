
const Index = {
	observe(payload) {
		this[payload]();
	},

	loadPages() { 
		KIA.dom.kiaPages.createPage();
		KIA.dom.kiaLayers.createPage();
		KIA.dom.kiaCanvas.createPage();
		KIA.dom.kiaCanvas.createPageName();
		KIA.dom.kiaCanvas.setPageNamePosition();
	},

	setTitle() {
		KIA.dom.kiaCanvas.updateDirtyPageTitle();
		KIA.dom.kiaLayers.updateDirtyPageTitle();
	},

	setStyle(){
		KIA.dom.kiaCanvas.updateDirtyPageStyle();
		KIA.dom.kiaPages.updateDirtyLayerLockVisibility();
	},
 
	addLayerToParent(){
		KIA.dom.kiaLayers.updateNodeChildrenLength();
		KIA.dom.kiaLayers.updateLayersPanel();
	},

	updateChildrenOrder(){
		KIA.dom.kiaLayers.updateChildrenOrder();
	},

	deletePage(){
		KIA.dom.kiaCanvas.deleteDirtyPage();
		KIA.dom.kiaPages.deleteDirtyPage();
		KIA.dom.kiaLayers.deleteDirtyPage();
		KIA.dom.kiaCanvas.setPageNamePosition();
	}
} 

export default Index; 