
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!['rect'].includes(lObj.tagName)) continue;
		const node = props.nodes[lId];
		const ancestorHasAnyClippingChild = methods.ancestorHasAnyClippingChild(lId);		
		if(ancestorHasAnyClippingChild) continue;

		lObj.tagName = 'DIV';
		lObj.instanceof = 'html';
		lObj.style['background-color'] = lObj.attributes.fill;
		lObj.style['border-width'] = (lObj.attributes['stroke-width']||0)+'px';			
		lObj.style.width = lObj.attributes.width+'px';
		lObj.style.height = lObj.attributes.height+'px';		
		lObj.style.left = node.left+'px';
		lObj.style.top = node.top+'px';
		
		delete lObj.attributes.fill;
		delete lObj.attributes['stroke-width'];
		delete lObj.attributes.transform;

		const gradientStack = methods.getGradientStack(lObj);
		if(!gradientStack) return;		
		lObj.style['background-image'] = KIA.utils.css.psdGradientObjectToCss(gradientStack);
	}
}

export default Index;