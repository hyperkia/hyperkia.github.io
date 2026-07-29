
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.attributes.transform = `translate(${node.left}, ${node.top})`;
}

export default Index;