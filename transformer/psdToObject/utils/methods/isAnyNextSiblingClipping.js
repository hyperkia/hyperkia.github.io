
import props from '../props.js';

function Index(lObj){
	const node = props.nodes[lObj.id];
	const parentNode = props.nodes[node.hyperkiaParent];
	const lObjIndex = parentNode.hyperkiaChildren.indexOf(lObj.id);
	let isTrue = false;
	
	parentNode.hyperkiaChildren.forEach((cId, i)=>{
		if(i<=lObjIndex) return;		
		if(props.nodes[cId].clipping) isTrue = true;
	});
	
	return isTrue;
}

export default Index;