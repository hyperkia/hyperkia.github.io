function Index(){
	const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;

	if(dirtyLayer.flag !== 'childrenOrder') return;

	const childrensId = KIA.nodesMap[dirtyLayer.id].children;

	const layersParentEl = KIA.layersRefMap[dirtyLayer.id].querySelector(':scope > .childrens');
	const canvasParentEl = KIA.canvasRefMap[dirtyLayer.id];
	
	childrensId.forEach(id => {		
        const layersChildEl = KIA.layersRefMap[id];
        if (layersChildEl) layersParentEl.appendChild(layersChildEl);

        const canvasChildEl = KIA.canvasRefMap[id];
        if (canvasChildEl) canvasParentEl.appendChild(canvasChildEl);
    });
}

export default Index;