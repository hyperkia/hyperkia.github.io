
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	
	let rgb = null;
	const vectorFill = node.vectorFill;
	if(!vectorFill) return;
	if(vectorFill.type === 'color') {
		rgb = vectorFill.color
	}
	if(!rgb) return;
	const fill = KIA.utils.color.rgbToHex(rgb);
	nodeObj.attributes.fill = fill;
}

export default Index;