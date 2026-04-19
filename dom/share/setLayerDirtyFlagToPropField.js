function Index(){

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	// Style
	KIA.state.ui.getProp('dirtyMap').layer.style.forEach((p)=>{
		KIA.propInputs[p].value = parseInt(layerObj.style[p]);
	});
}

export default Index;