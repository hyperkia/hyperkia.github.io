function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'attributes') return;

	const layerEl = KIA.canvasRefMap[dirtyLayer.id];
	const layerObj = KIA.nodesMap[dirtyLayer.id];
	
	KIA.state.ui.getProp('dirtyMap').layer.attributes.forEach((p)=>{
		layerEl.setAttribute(p, layerObj.attributes[p])
	});
}

export default Index;