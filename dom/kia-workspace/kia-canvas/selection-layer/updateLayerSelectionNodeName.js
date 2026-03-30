function Index() {
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	const layerEl = KIA.dom.read.getSelectionLayerElement();

	if(layerEl.nodeName.toLowerCase() === layerObj.nodeName) return;

	const attrs = layerEl.attributes;
	const innerHTML = layerEl.innerHTML;

	const newNode = document.createElement(layerObj.nodeName);
	for(let a of attrs) newNode.setAttribute(a.name, a.value);
	newNode.innerHTML = innerHTML;

	layerEl.after(newNode);
	layerEl.remove();
}

export default Index;