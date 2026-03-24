function Index() {
	let type = 'canvas';
	const key = KIA.state.ui.selectionKeys.values().next().value;
	const layerObj = KIA.state.layers.map[key];
	if(layerObj) type = layerObj.type;
	const pageObj = KIA.state.pages.map[key];
	if(pageObj) type = 'page';
	return type;
}

export default Index;