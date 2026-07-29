function Index() {
	const id = KIA.state.ui.getSelectionId();
	const layerObj = KIA.nodesMap[id];
	if(layerObj && ['html','svg'].includes(layerObj.instanceof)) return layerObj;
}

export default Index;