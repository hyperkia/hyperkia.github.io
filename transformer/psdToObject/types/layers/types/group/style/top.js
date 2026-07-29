
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];

	let top = Infinity;

	node.children.forEach((child) => {

		if (child.hidden) return;

		top = Math.min(top, child.top ?? 0);
	});

	top === Infinity ? 0 : top;

	nodeObj.style.top = top+'px';
}

export default Index;