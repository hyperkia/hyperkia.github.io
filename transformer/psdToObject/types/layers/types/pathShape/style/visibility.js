
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style.visibility = node.hidden ? 'hidden':'inherit';
}

export default Index;