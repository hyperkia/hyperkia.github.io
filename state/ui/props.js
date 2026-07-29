const Index = {
	canvasZoom: 1,
	pagesX: 1,
	pagesY: 1,
	activeTool: 'triangle',
	selectionKeys: null,
	preferenceTheme: 'system',
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
	dirtyMap: {
		deleteLayer: null,
		moveLayer: null,
		layer: {},
		page: {}
	},
	escapeStack: [],
	activePressedkeyCode: null,
	copy: {
		layer: null,
		page: null,
		effects: null,
	},
	
};

export default Index;