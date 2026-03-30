
const Index = {
	observe(payload) {
		this[payload]();
	},

	renderPageList() {
		KIA.dom.kiaPages.renderPageList();
		KIA.dom.kiaCanvas.renderPageList();
		KIA.dom.kiaCanvas.renderPageNameList();
		KIA.dom.kiaCanvas.setPageNamePosition();
	},

	pageNameChange() {
		KIA.dom.kiaCanvas.pageNameChange();
	},

	deleteSelectedPage(){
		KIA.dom.kiaCanvas.deleteSelectedPage();
		KIA.dom.kiaPages.deleteSelectedPage();
		KIA.dom.kiaCanvas.setPageNamePosition();
	},

	changePageVisiblility(){
		KIA.dom.kiaCanvas.changePageVisiblility();
		// KIA.dom.kiaPages.changePageVisiblility();
		// KIA.dom.kiaLayers.changePageVisiblility();
	},

	changePagePointerLock(){
		KIA.dom.kiaCanvas.updatePagePointerLock();
		// KIA.dom.kiaPages.changePageVisiblility();
		// KIA.dom.kiaLayers.changePageVisiblility();
	},

	setSelectionCss(){
		KIA.dom.kiaCanvas.updatePageSelectionCss();
	}
} 

export default Index; 