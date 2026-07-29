
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];

	let left = Infinity;

	node.children.forEach((child) => {

		if (child.hidden) return;

		left = Math.min(left, child.left ?? 0);
	});

	left === Infinity ? 0 : left;	

	nodeObj.style.left = left+'px';
}

export default Index;