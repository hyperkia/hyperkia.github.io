function Index() {
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'nodeName') return;

	const layerEl = KIA.canvasRefMap[dirtyLayer.id];
	const layerObj = KIA.nodesMap[dirtyLayer.id];

	if(layerEl.nodeName === layerObj.nodeName) return;

	const attrs = layerEl.attributes;
	const innerHTML = layerEl.innerHTML;

	const newNode = document.createElement(layerObj.nodeName);
	KIA.canvasRefMap[dirtyLayer.id] = newNode;
	for(let a of attrs) newNode.setAttribute(a.name, a.value);
	newNode.innerHTML = innerHTML;

	layerEl.after(newNode);
	layerEl.remove();
}

export default Index;