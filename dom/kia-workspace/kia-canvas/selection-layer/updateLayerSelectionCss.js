function Index(){
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	Object.assign(layerEl.style, layerObj.css);
}

export default Index;