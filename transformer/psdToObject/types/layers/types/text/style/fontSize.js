import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const fontSize = layerMethods.extractFontSize(node);
	if(!fontSize) return;
	nodeObj.style['font-size'] = fontSize;
}

export default Index;