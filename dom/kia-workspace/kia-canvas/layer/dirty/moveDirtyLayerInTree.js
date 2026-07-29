function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
	if(dirtyLayer.source === 'kiaCanvas') return;
	if(dirtyLayer.flag !== 'reparent' ) return;

	const layerObj = KIA.nodesMap[dirtyLayer.id];
	const layerEl = KIA.canvasRefMap[dirtyLayer.id];
	const parentObj = KIA.nodesMap[layerObj.parent];
	const parentEl = KIA.canvasRefMap[parentObj.id];

	Object.assign(layerEl.style, layerObj.style);

	parentEl.appendChild(layerEl);
	parentObj.children.forEach(id => {
        const el = KIA.canvasRefMap[id];
        if (el) parentEl.appendChild(el);
    });
}

export default Index;