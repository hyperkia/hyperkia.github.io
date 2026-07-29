
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const strokeColor = node.effects?.stroke?.[0]?.color;
	if(!strokeColor) return;
	const stroke = KIA.utils.color.rgbToHex(strokeColor);
	nodeObj.attributes.stroke = stroke;
}

export default Index;