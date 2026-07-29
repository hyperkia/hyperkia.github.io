
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const width = node.right - node.left;
	nodeObj.attributes.width = width;
}

export default Index;