
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const nodeParent = props.nodes[node.hyperkiaParent];
	const x = node.left - nodeParent.left;
	nodeObj.attributes.x = x;
}

export default Index;