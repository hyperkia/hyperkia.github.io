import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];

	let height = node.bottom - node.top;
	nodeObj.attributes.height = height;
}

export default Index;