function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	
	if(dirtyLayer.source === 'kiaCanvas') return;
	if(dirtyLayer.flag !== 'reparent' ) return;

	const layerObj = KIA.dom.read.resolveObjectById(dirtyLayer.id);
	const layerEl = KIA.dom.read.resolveElementByIdInCanvas(dirtyLayer.id);
	const parentObj = KIA.dom.read.resolveObjectById(layerObj.parent);
	const parentEl = KIA.dom.read.resolveElementByIdInCanvas(parentObj.id);

	Object.assign(layerEl.style, layerObj.style);

	const layerIndex = parentObj.children.indexOf(dirtyLayer.id);
	const prevIndex = layerIndex - 1;

	if(layerIndex === 0) {
		parentEl.insertAdjacentElement('afterbegin', layerEl);
	} else {
		const prevIndexEl = KIA.dom.read.resolveElementByIdInCanvas(parentObj.children[prevIndex]);
		prevIndexEl.after(layerEl);
	}
}

export default Index;