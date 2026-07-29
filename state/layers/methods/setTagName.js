

function Index(newLayerObj){
	const id = newLayerObj.id;
	KIA.nodesMap[id].tagName = newLayerObj.tagName;
	KIA.observer.layers.observe('setTagName');
}

export default Index;