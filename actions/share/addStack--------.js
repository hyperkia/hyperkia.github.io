function Index(layerNewObj) {
	KIA.state.layers.setSelectionProperties(layerNewObj);
	const layersObj = KIA.dom.read.getSelectionLayerObject();
	KIA.services.idb.core.updateObject('layers', layersObj.key, layerNewObj);
}

export default Index;