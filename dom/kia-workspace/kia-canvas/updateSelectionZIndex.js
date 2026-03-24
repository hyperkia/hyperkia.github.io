function Index() {
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	layerEl.style.zIndex = layerObj.css['z-index'];
}

export default Index;