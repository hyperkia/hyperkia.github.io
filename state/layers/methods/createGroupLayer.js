function Index(groupLayerObj){
	KIA.nodesMap[groupLayerObj.id] = groupLayerObj;
	KIA.observer.layers.observe('createGroupLayer');
}

export default Index;