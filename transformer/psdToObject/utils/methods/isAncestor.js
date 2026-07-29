
import props from '../props.js';

function Index(lObj, target){
	let parentObj = props.nodesObj[lObj.parent];
	let i = 0;
	while(parentObj.tagName) {
		if(parentObj.tagName === target) return parentObj.id;
		parentObj = props.nodesObj[parentObj.parent];
		i++;
		if(i === 1000) break;
	}
}

export default Index;