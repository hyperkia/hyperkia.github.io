  
const Index = {
	observe: function(payload) {
		this[payload]();
	},

	changeCanvasScale() {
		KIA.dom.kiaCanvas.setCanvasPositionScale(); 
		KIA.dom.kiaCanvas.setPageNamePosition();
	},

	changeActiveTool() {
		KIA.dom.kiaCanvasTools.changeActiveTool();
		KIA.dom.kiaCanvas.setCanvasActiveTool();
	},

	openModal(){
		KIA.dom.kiaModals.openModal();
	},

	closeModal(){
		KIA.dom.kiaModals.closeModal();
	},

	openColorPicker(){
		KIA.dom.kiaColorPickerPopover.openColorPickerPopover();
	},

	setSelectionIds(){
		KIA.managers.style.selectionToPropsInput();
		KIA.dom.kiaCanvas.selectionLayerResizeController();
	},

	setPreferenceTheme(){
		KIA.dom.share.setPreferenceTheme();
	}
}

export default Index;