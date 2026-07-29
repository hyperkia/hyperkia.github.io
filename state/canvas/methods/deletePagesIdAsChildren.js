
import props from '../props.js';

function Index(id){
	const children = props.children;
	const deleteIndex = children.indexOf(id);
	if (deleteIndex !== -1) children.splice(deleteIndex, 1);
}

export default Index;