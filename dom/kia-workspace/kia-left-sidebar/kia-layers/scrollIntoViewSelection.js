function Index(){
	const id = KIA.state.ui.getSelectionId();
	KIA.dom.kiaLayers.createSelectionNode();
	KIA.dom.kiaLayers.updateLayersPanel();
	KIA.layersRefMap[id]?.scrollIntoView();
}

export default Index;