
function Index(){
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	const attrs = layerObj.attrs;

	for (let p in attrs) {
		if(attrs[p]) layerEl.setAttribute(p, attrs[p]);
	}
}

export default Index;