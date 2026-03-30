  
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

	setSelectionKeys(){
		KIA.managers.css.selectionToPropsInput();
		KIA.dom.kiaCssFilter.selectionToFilterInputs();
		KIA.dom.kiaCssEffect.selectionEffectList();
	},
}

export default Index;