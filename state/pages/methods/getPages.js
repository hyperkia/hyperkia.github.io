

function Index(){
	const pages = {};
	for(let [nId, nObj] of Object.entries(KIA.nodesMap)) {
		if(nObj.instanceof === 'document') pages[nId] = nObj;
	}

	return pages;
}

export default Index;