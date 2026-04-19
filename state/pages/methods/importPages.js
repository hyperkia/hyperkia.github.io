
import props from '../props.js';

function Index(pages){
	Object.assign(props.map, pages);
	KIA.observer.pages.observe('renderPageList');
}

export default Index;