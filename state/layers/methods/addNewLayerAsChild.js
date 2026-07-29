

function Index(id){
	const layerObj = KIA.nodesMap[id];
	const pageObj = KIA.nodesMap[layerObj.parent];
	pageObj.children.push(id);
}

export default Index;