function Index(stack) {
	KIA.state.layers.addStack(stack);
	
	const layersObj = KIA.dom.read.getSelectionLayerObject();
	KIA.services.idb.core.updateObject('layers', layersObj.key, {stack: layersObj.stack});
}

export default Index;