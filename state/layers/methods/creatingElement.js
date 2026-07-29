

function Index(layerObj){
	KIA.nodesMap[layerObj.id] = layerObj;
	KIA.observer.layers.observe('creatingElement');
}

export default Index;