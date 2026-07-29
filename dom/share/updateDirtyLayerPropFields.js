function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.flag !== 'style') return;
	const layerObj = KIA.nodesMap[dirtyLayer.id]
	const normalizeStyle = KIA.utils.css.normalizeStyleValueForFormControl(layerObj.style);
	dirtyLayer.style.forEach((p)=>{
		KIA.propInputs[p] && (KIA.propInputs[p].value = normalizeStyle[p]);
	});
}

export default Index;