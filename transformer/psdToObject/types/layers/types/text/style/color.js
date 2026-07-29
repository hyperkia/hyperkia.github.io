import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const fillColor = node.text.style?.fillColor;
	if(!fillColor) return;
	const color = KIA.utils.color.rgbToHex(fillColor);
	nodeObj.style.color = color;
}

export default Index;