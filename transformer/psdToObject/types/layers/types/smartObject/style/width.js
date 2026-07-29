import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];

	let width = node.right - node.left;
	nodeObj.style.width = width + 'px';
}

export default Index;