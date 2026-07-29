

function Index(id){
	KIA.nodesMap[id] = null;
	delete KIA.nodesMap[id];
	KIA.observer.pages.observe('deletePage');
}

export default Index;