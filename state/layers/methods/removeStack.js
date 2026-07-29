

function Index(newLayerObj){
	const id = newLayerObj.id;
	const layerStack = KIA.nodesMap[id].stack;
	layerStack.forEach((s, i)=>{
		if(s.id === newLayerObj.stackId) layerStack.splice(i, 1);
	});
}

export default Index;