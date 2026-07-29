
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {
		if(lObj.tagName !== 'svg') continue;
		const nestChild = methods.getAllNestedChildrens(lObj);
		const svgBounds = methods.getLayersBounds(nestChild);
		
		lObj.style.left = svgBounds.left+'px';
		lObj.style.top = svgBounds.top+'px';
		lObj.style.width = svgBounds.width+'px';
		lObj.style.height = svgBounds.height+'px';		
		lObj.attributes.viewBox = `0 0 ${svgBounds.width} ${svgBounds.height}`;
	}
}

export default Index;