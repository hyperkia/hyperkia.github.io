

function Index(newLayerObj){
	const updateStack = newLayerObj.updateStack;
	const stackId = updateStack.id;
	const layerStack = KIA.nodesMap[newLayerObj.id].stack;

	layerStack.forEach((s, i)=>{
		if(s.id === updateStack.id) {
			if('enable' in updateStack) s.enable = updateStack.enable;
			if('value' in updateStack) Object.assign(s.value, updateStack.value);
		}
	});
}


export default Index;