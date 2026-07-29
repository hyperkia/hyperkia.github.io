
import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	
	const parseShape = layerMethods.getShapePath(node);	
	nodeObj.attributes.d = parseShape.d;
}

export default Index;