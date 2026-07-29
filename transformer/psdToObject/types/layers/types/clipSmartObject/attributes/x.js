import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.attributes.x = node.left;
}

export default Index;