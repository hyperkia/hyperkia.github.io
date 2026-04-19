
import props from '../props.js';

function Index(newPage){
	props.map[newPage.id] = newPage;
	props.map[newPage.id] = newPage;
	KIA.nodesMap[newPage.id] = newPage;		
	KIA.observer.pages.observe('renderPageList');
}

export default Index;