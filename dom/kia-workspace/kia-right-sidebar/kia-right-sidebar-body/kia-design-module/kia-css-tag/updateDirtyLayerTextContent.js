
function Index() {
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'textContent') return;
	if(dirtyLayer.source === 'kiaCssTag') return;

	const layerObj = KIA.nodesMap[dirtyLayer.id];
	const inputEl = KIA.kiaCssTag.$id.tagInnerText;
	inputEl.value = layerObj.textContent;
}

export default Index;