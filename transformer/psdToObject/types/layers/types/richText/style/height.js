import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const lineHeight = parseFloat(layerMethods.extractLineHeight(node)) / 2;
	const height = parseFloat(layerMethods.extractHeight(node));
	nodeObj.style['height'] = Math.ceil(lineHeight + height) + 'px';


}

export default Index;