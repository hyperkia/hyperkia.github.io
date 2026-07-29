

function Index(newLayerObj){
	const id = newLayerObj.id;
	KIA.nodesMap[id].textContent = newLayerObj.textContent;
	KIA.observer.layers.observe('setTextContent');
}

export default Index;