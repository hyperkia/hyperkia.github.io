function Index(layerObj){
	KIA.state.ui.setDirtyMap({
		layer: {
			id: layerObj.id,
			style: Object.keys(layerObj.style),
			flag: 'style',
			flagType: 'creatingElement',
		}
	});
	KIA.state.layers.creatingElement(layerObj);
	KIA.state.ui.resetDirtyMap();
}

export default Index;