
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	
	let rgb = null;
	const vectorFill = node.vectorFill;
	if(!vectorFill) return;
	if(vectorFill.type === 'color') {
		rgb = vectorFill.color
	} else if(vectorFill.type === 'solid') {
		rgb = vectorFill.colorStops?.[0]?.color
	}

	if(rgb.fr && rgb.fg && rgb.fb) {
		rgb.r = KIA.utils.color.floatColorTo255(rgb.fr);
		rgb.g = KIA.utils.color.floatColorTo255(rgb.fg);
		rgb.b = KIA.utils.color.floatColorTo255(rgb.fb);
	}

	const fill = KIA.utils.color.rgbToHex(rgb);
	nodeObj.attributes.fill = fill;
}

export default Index;