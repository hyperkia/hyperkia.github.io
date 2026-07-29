

function Index(newLayerObj){
	const id = newLayerObj.id;
	const layerObj = KIA.nodesMap[id];
	layerObj.stack.push(...newLayerObj.stack);
}

export default Index;