
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!['path'].includes(lObj.tagName)) continue;
		const node = props.nodes[lId];
		const ancestorHasAnyClippingChild = methods.ancestorHasAnyClippingChild(lId);		
		if(ancestorHasAnyClippingChild) continue;

		const pathObj = KIA.utils.svg.detectPathPSDCircle(lObj.attributes.d);		
		if(pathObj?.isCircle) {
			const node = props.nodes[lId];
			lObj.tagName = 'DIV';
			lObj.instanceof = 'html';
			lObj.style['background-color'] = lObj.attributes.fill;
			lObj.style['border-width'] = (lObj.attributes['stroke-width']||0)+'px';				
			lObj.style.width = pathObj.width+'px';
			lObj.style.height = pathObj.height+'px';
			lObj.style['border-radius'] = parseInt(pathObj.width/2)+1+'px';
			lObj.style.left = node.left+'px';
			lObj.style.top = node.top+'px';
			
			delete lObj.attributes.fill;
			delete lObj.attributes['stroke-width'];
			delete lObj.attributes.transform;
			delete lObj.attributes.d;

			const gradientStack = methods.getGradientStack(lObj);
			if(!gradientStack) return;
			lObj.style['background-image'] = KIA.utils.css.psdGradientObjectToCss(gradientStack);
		}
	}
}

export default Index;