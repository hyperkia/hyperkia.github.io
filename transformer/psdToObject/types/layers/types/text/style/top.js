
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style.top = node.top + 'px';
}

export default Index;