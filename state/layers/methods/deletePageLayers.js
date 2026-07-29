

function Index(pId){
	for(let [lId,lObj] of Object.entries(KIA.nodesMap)) {
		if(!['svg','html'].includes(lObj.instanceof)) return;
		if(lObj.parent !== pId) continue;
		KIA.nodesMap[lId] = null;
		delete KIA.nodesMap[lId];
	}	
}

export default Index;