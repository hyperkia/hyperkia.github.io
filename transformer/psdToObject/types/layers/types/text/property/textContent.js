
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.textContent = node.text.text;
}

export default Index;