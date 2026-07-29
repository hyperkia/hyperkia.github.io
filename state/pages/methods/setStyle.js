
import props from '../props.js';

function Index(newPageObj){
	const id = newPageObj.id;
	Object.assign(KIA.nodesMap[id].style, newPageObj.style);
	KIA.observer.pages.observe('setStyle');
}

export default Index;