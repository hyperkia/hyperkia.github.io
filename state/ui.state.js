
const Index = {
	canvasZoom: 1,
	pagesX: 1,
	pagesY: 1,
	activeTool: 'triangle',
	selectionKeys: new Set().add('canvas'),
	openModal: null,
	colorPicker: {
	  open: false,
	  value: '',

	  target: {
	    type: '', //'css' | 'gradient-stop'

	    payload: {
	      property: undefined,
	      stopIndex: undefined,
	    }
	  }
	},

	setCanvasScale(obj){
		if(obj.zoom) this.canvasZoom = obj.zoom;
		if(obj.pagesX) this.pagesX = obj.pagesX;
		if(obj.pagesY) this.pagesY = obj.pagesY;
		KIA.observer.ui.observe('changeCanvasScale');
	},

	setActiveTool(activeTool){
		this.activeTool = activeTool; 
		KIA.observer.ui.observe('changeActiveTool');
	},
 
	setSelectionKeys(keys){
		if(keys.size === 0) keys.add('canvas');
		this.selectionKeys = keys;
		KIA.observer.ui.observe('setSelectionKeys');
	},

	setOpenModal(modalName) {
		this.openModal = modalName;
		KIA.observer.ui.observe('openModal');
	},

	setCloseModal(){
		this.openModal = null;
		KIA.observer.ui.observe('closeModal');
	},
 
	openColorPicker(obj){
		this.colorPicker.value = obj.value;
		this.colorPicker.open = true;
		this.colorPicker.target.type = obj.type;
		this.colorPicker.target.payload.property = obj.property;
		KIA.observer.ui.observe('openColorPicker');
	},

	setColorValue(hexValue){
		this.colorPicker.value = hexValue;
	},
}

export default Index;