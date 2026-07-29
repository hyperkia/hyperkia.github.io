function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(!dirtyLayer.computed) return;
	const layerObj = KIA.nodesMap[dirtyLayer.id]

	// Style
	dirtyLayer.style.forEach((p)=>{
		if(KIA.propInputs[p]) KIA.propInputs[p].value = parseInt(layerObj.style[p]);
	});
}

export default Index;