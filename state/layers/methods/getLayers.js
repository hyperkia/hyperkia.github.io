

function Index(){
	const layers = {};
	for(let [nId, nObj] of Object.entries(KIA.nodesMap)) {
		if(['svg','html'].includes(nObj.instanceof)) layers[nId] = nObj;
	}

	return layers;
}

export default Index;