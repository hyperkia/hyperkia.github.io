function Index(){
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	
	KIA.dom.kiaCanvas.updateLayerSelectionNodeName();
}

export default Index;