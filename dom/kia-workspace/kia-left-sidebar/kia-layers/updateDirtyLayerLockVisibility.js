function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flagType !== 'lockVisibility' ) return;

	const layerObj = KIA.nodesMap[dirtyLayer.id];
	const layerEl = KIA.layersRefMap[dirtyLayer.id];
	dirtyLayer.style.forEach((s)=>{
		if(s==='visibility') layerEl.dataset.visibility = layerObj.style.visibility;
		if(s==='pointer-events') layerEl.dataset.lock = layerObj.style['pointer-events'];
	})
}

export default Index;