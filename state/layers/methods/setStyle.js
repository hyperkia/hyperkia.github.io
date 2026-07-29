

function Index(newLayerObj){
	const id = newLayerObj.id;
	Object.assign(KIA.nodesMap[id].style, newLayerObj.style);
	KIA.observer.layers.observe('setStyle');
}

export default Index;