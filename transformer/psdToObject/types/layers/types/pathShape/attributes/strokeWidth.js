
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const strokeWidth = node.effects?.stroke?.[0]?.size?.value;
	nodeObj.attributes['stroke-width'] = strokeWidth;
}

export default Index;