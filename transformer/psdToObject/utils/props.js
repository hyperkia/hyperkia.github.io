const Index = {
	rawPsd: null,
	nodes: {},
	nodesObj: {},
	active: {
		layer: null,
		layerType: '',
		layerObject: null,
	},
	parse: {
		layers: {},
		pages: {},
		canvas: {},
		assets: {},
	},
	fonts: new Set(),
};

export default Index;