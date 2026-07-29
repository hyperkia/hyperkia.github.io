function Index() {
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'deleteLayer') return;

	KIA.canvasRefMap[dirtyLayer.id].remove();
	KIA.canvasRefMap[dirtyLayer.id] = null;
	delete KIA.canvasRefMap[dirtyLayer.id];

}

export default Index;