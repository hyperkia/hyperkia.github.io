
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const height = node.bottom - node.top;
	nodeObj.attributes.height = height;
}

export default Index;