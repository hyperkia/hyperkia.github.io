
import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	
	const overlay = node.effects?.gradientOverlay?.[0];
	if(overlay) {
		const gradientCss = layerMethods.gradientToCSS(overlay);
		Object.assign(nodeObj.style, gradientCss)
	}
}

export default Index;