function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'attributes') return;

	const layerEl = KIA.canvasRefMap[dirtyLayer.id];
	const layerObj = KIA.nodesMap[dirtyLayer.id];
	
	KIA.state.ui.getProp('dirtyMap').layer.attributes.forEach((p)=>{
		let value = undefined;
		if(p === 'src') value = KIA.state.assets.getAssets()[layerObj.attributes[p]].url;
		layerEl.setAttribute(p, value || layerObj.attributes[p])
	});
}

export default Index;