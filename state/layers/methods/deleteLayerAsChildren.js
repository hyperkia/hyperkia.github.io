

function Index(id){
	const layerObj = KIA.nodesMap[id];
	const parentObj = KIA.nodesMap[layerObj.parent];
	const deleteIndex = parentObj.children.indexOf(layerObj.id);
	if (deleteIndex !== -1) parentObj.children.splice(deleteIndex, 1);
}

export default Index;