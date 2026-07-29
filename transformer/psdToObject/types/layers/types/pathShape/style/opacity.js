
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style.opacity = KIA.utils.number.fixedDigits(node.opacity);
}

export default Index;