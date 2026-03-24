function Index() {
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	const textLayerEl = KIA.dom.read.getSelectionLayerElement();
	if(textLayerEl.innerText !== layerObj.innerText) textLayerEl.innerText = layerObj.innerText;
}

export default Index;