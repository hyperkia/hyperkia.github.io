

function Index(newPageObj){
	KIA.nodesMap[newPageObj.id].title = newPageObj.title;		
	KIA.observer.pages.observe('setTitle');
}

export default Index;