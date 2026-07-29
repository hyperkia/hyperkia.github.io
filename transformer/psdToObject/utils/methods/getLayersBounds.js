
import props from '../props.js';

function Index(ids=[]){
	const bounds = {
		left: [],
		top: [],
		right: [],
		bottom: [],		
	};
	ids.forEach((id)=>{
		const node = props.nodes[id];
		bounds.left.push(parseInt(node.left));
		bounds.top.push(parseInt(node.top));
		bounds.right.push(parseInt(node.right));
		bounds.bottom.push(parseInt(node.bottom));		
	});

	return {
		left: Math.min(...bounds.left),
		top: Math.min(...bounds.top),
		width: Math.max(...bounds.right)-Math.min(...bounds.left),
		height: Math.max(...bounds.bottom)-Math.min(...bounds.top),		
	}
}

export default Index;