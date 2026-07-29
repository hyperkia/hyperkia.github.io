

function Index(newPage){
	KIA.nodesMap[newPage.id] = newPage;		
	KIA.observer.pages.observe('loadPages');
}

export default Index;