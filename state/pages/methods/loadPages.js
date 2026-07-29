

function Index(pages){
	Object.assign(KIA.nodesMap, pages);	
	KIA.observer.pages.observe('loadPages');
}

export default Index;