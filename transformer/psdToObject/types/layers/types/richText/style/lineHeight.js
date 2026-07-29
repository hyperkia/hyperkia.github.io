import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style['line-height'] = layerMethods.extractLineHeight(node);
}

export default Index;