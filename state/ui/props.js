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
	dirtyMap: {
		deleteLayer: null,
		moveLayer: null,
		layer: {},
		page: {}
	},
};

export default Index;