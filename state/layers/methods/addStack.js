

function Index(newLayerObj){
	const id = newLayerObj.id;
	const layerObj = KIA.nodesMap[id];
	layerObj.stack.push(newLayerObj.newStack);
}

export default Index;