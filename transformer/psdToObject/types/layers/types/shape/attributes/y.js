
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const nodeParent = props.nodes[node.hyperkiaParent];
	const y = node.top - nodeParent.top;
	nodeObj.attributes.y = y;
}

export default Index;