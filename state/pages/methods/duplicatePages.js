

function Index(newPagesObj){
	newPagesObj.forEach((pObj)=>{
		KIA.nodesMap[pObj.id] = pObj;
	});
	KIA.observer.pages.observe('loadPages');
}

export default Index;