function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'style') return;
	if(dirtyLayer.source === 'kiaCanvas') return;

	const layerEl = KIA.canvasRefMap[dirtyLayer.id];	
	const layerObj = KIA.nodesMap[dirtyLayer.id];
	
	KIA.state.ui.getProp('dirtyMap').layer.style.forEach((p)=>{
		layerEl.style[p] = layerObj.style[p];
	});
}

export default Index;