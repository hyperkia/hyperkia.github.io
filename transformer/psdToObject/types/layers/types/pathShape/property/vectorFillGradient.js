
import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const vf = node.vectorFill;
	const isGradientFill = vf && Array.isArray(vf.colorStops) && vf.colorStops.length > 0 && typeof vf.style === "string";
	if(!isGradientFill) return;	
	const gradientObj = layerMethods.extractVectorFillGradient(vf);		
	gradientObj.type = 'gradient';
	gradientObj.name = 'fill';		
	gradientObj.stops.forEach((s)=>{
		s.hexa = KIA.utils.color.rgbToHex(s.rgb);
	});
	nodeObj.stack.push(gradientObj);		
}

export default Index;