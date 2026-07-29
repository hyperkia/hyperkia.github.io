

function Index(layerObj){
	KIA.nodesMap[layerObj.parent].children.push(layerObj.id);
	KIA.observer.layers.observe('addLayerToParent');
}

export default Index;