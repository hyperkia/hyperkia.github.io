function Index(){
	let selectionId = KIA.state.ui.getSelectionId();
    selectionId = KIA.dom.read.getClosestHtmlKindIdById(selectionId);
	const layerObj = KIA.nodesMap[selectionId];
	if(!layerObj) {
		KIA.kiaCanvas.$id.resizeController.style = '';
		return;
	}

	const layerEl = KIA.canvasRefMap[layerObj.id];
	if(!layerEl) return;
	const layerElRect = layerEl.getBoundingClientRect();
	const canvasRect = KIA.kiaCanvas.getBoundingClientRect();
	const left = layerElRect.left - canvasRect.left + KIA.kiaCanvas.scrollLeft - KIA.kiaCanvas.clientLeft;
	const top = layerElRect.top - canvasRect.top + KIA.kiaCanvas.scrollTop - KIA.kiaCanvas.clientTop;

	KIA.kiaCanvas.$id.resizeController.style.cssText = `
		left: ${left}px;
		top: ${top}px;
		width: ${layerElRect.width}px;
		height: ${layerElRect.height}px;
		opacity: 1;
	`;
}

export default Index;