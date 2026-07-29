

function Index(newLayerObjs){
	newLayerObjs.forEach((lObj)=>{
		KIA.nodesMap[lObj.id] = lObj;
	})
}

export default Index;