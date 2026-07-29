

function Index(layerObj){
	Object.assign(KIA.nodesMap[layerObj.id].style, layerObj.style);
	KIA.observer.layers.observe('movingLayer');
}

export default Index;