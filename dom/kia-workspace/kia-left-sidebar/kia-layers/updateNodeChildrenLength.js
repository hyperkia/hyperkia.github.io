function Index(){
	const layers = KIA.state.layers.getProp('map');
	const pages = KIA.state.pages.getProp('map');
	const nodeEls = KIA.kiaLayers._qsAll('[data-children]');

	nodeEls.forEach((nodeEl)=>{
		const id = nodeEl.dataset.item;
		const obj = layers[id] || pages[id];
		if(!obj) return;
		nodeEl.dataset.children = obj.children.length;	
	})	
}

export default Index;