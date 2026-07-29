function Index(){
	const id = KIA.state.ui.getSelectionId();
	KIA.dom.kiaLayers.createSelectionNode();
	KIA.dom.kiaLayers.updateLayersPanel();

	const el = KIA.layersRefMap[id];
	if(!el) return;
	const elRect = el.getBoundingClientRect();
	const layersRect = KIA.kiaLayers.getBoundingClientRect();
	if(elRect.top < layersRect.top || elRect.top > window.innerHeight) el.scrollIntoView();
}

export default Index;