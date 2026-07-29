import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const shapeType = node.text.shapeType;
	if(shapeType === 'box') nodeObj.style.overflow = 'hidden';
}

export default Index;