
import props from '../props.js';

function Index(pages){
	props.map = pages;
	Object.assign(KIA.nodesMap, pages);
	KIA.observer.pages.observe('renderPageList');
}

export default Index;