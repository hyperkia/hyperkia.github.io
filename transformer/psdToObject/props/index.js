const Index = {
	file: null,
	psdRaw: null,
	parseLayers: [],	
	activeParseLayer: {
		pageKey: undefined,
		zIndex: 0,
		clipBaseLayer: null,
		clipSiblingLayer: [],
		layer: null,
	},	
};

export default Index;