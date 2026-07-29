

function Index(newLayerObj){
	const id = newLayerObj.id;
	Object.assign(KIA.nodesMap[id].attributes, newLayerObj.attributes);
	KIA.observer.layers.observe('setAttributes');
}

export default Index;