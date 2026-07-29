

function Index(newLayerObjs){
	newLayerObjs.forEach((lObj)=>{		
		KIA.nodesMap[lObj.id] = lObj;
	});
	KIA.observer.layers.observe('duplicateLayer');
}

export default Index;