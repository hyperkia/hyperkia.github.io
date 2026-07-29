
import props from '../props.js';

function Index(pagesObj, selectionId){
	const children = props.children;
	const selectionIndex = children.indexOf(selectionId);
	pagesObj.forEach((pObj)=>{
		children.splice(selectionIndex + 1, 0, pObj.id);
	})
	
}

export default Index;