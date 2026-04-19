
import props from '../props.js';

function Index(newPageObj){
	props.map[newPageObj.id].title = newPageObj.title;		
	KIA.observer.pages.observe('setTitle');
}

export default Index;