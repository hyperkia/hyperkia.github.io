
import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	
	const overlay = node.effects?.gradientOverlay?.[0];
	if(overlay && overlay.enabled) {
		const gradientObj = layerMethods.extractEffectGradientOverlay(overlay);		
		gradientObj.type = 'gradient';
		gradientObj.name = 'fill';
		nodeObj.stack.push(gradientObj);		
	}
}

export default Index;