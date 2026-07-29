function Index(){
	const layersEl = KIA.kiaCanvas._qsAll('.canvas-layer');
	layersEl.forEach((lEl)=>{
		const lId = lEl.dataset.layer;
		if(!KIA.nodesMap[lId]) {
			console.log('Canvas Layer Element Not Exist In NodesMap');
			console.error('Canvas Layer Element Not Exist In NodesMap');
			console.warn('Canvas Layer Element Not Exist In NodesMap');
		}
	});


	for(let [nId, nObj] of Object.entries(KIA.nodesMap)) {
		const isInDom = KIA.canvasRefMap[nId] && (KIA.kiaCanvas._qs(`[data-layer="${nId}"]`) || KIA.kiaCanvas._qs(`[data-page="${nId}"]`));
		if(!isInDom) {			
			console.log('Node Not Exist In DOM');
			console.error('Node Not Exist In DOM');
			console.warn('Node Not Exist In DOM');
		}
	}

	KIA.services.idb.core.getAllObjects('layers').then((layers)=>{
		for(let [lId, lObj] of Object.entries(layers)) {

			// Self
			const isInDom = KIA.canvasRefMap[lId] && (KIA.kiaCanvas._qs(`[data-layer="${lId}"]`));
			if(!isInDom) {			
				console.log('Layer Not Exist In DOM');
				console.error('Layer Not Exist In DOM');
				console.warn('Layer Not Exist In DOM');
			}

			// Childrens
			lObj.children.forEach((cId)=>{
				const isInDom = KIA.canvasRefMap[cId] && (KIA.kiaCanvas._qs(`[data-layer="${cId}"]`)) && KIA.nodesMap[cId];
				if(!isInDom) {			
					console.log('Layer Not Exist In DOM');
					console.error('Layer Not Exist In DOM');
					console.warn('Layer Not Exist In DOM');
				}
			});
		}
	});


	KIA.services.idb.core.getAllObjects('pages').then((pages)=>{
		for(let [pId, pObj] of Object.entries(pages)) {

			// Self
			const isInDom = KIA.canvasRefMap[pId] && (KIA.kiaCanvas._qs(`[data-page="${pId}"]`));
			if(!isInDom) {			
				console.log('Page Not Exist In DOM');
				console.error('Page Not Exist In DOM');
				console.warn('Page Not Exist In DOM');
			}

			// Childrens
			pObj.children.forEach((cId)=>{
				const isInDom = KIA.canvasRefMap[cId] && (KIA.kiaCanvas._qs(`[data-layer="${cId}"]`)) && KIA.nodesMap[cId];
				if(!isInDom) {			
					console.log('Layer Not Exist In DOM');
					console.error('Layer Not Exist In DOM');
					console.warn('Layer Not Exist In DOM');
				}
			})
		}
	});
}

export default Index;	