
function Index(newLayersObj){
	newLayersObj.forEach((lObj)=>{
		KIA.nodesMap[lObj.id] = lObj;
	});
	KIA.observer.layers.observe('loadLayers');
}

export default Index;