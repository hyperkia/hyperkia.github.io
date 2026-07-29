function Index(){
	const nodeEls = KIA.kiaLayers._qsAll('[data-children]');

	nodeEls.forEach((nodeEl)=>{
		const id = nodeEl.dataset.item;
		const obj = KIA.nodesMap[id];
		if(!obj) return;
		nodeEl.dataset.children = obj.children.length;	
	})	
}

export default Index;