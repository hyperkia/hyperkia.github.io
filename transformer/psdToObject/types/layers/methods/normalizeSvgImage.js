
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {
		if(lObj.tagName !== 'IMG') continue;
		
		if(methods.isAncestor(lObj, 'svg')) {
			lObj.tagName = 'image';
			lObj.instanceof = 'svg';
			lObj.attributes.href = lObj.attributes.src;
			lObj.attributes.width = parseInt(lObj.style.width);
			lObj.attributes.height = parseInt(lObj.style.height);
			lObj.attributes.x = parseInt(lObj.style.left);
			lObj.attributes.y = parseInt(lObj.style.top);

			delete lObj.attributes.src;
			delete lObj.style.width;
			delete lObj.style.height;
			delete lObj.style.left;
			delete lObj.style.top;
		}

	}
}

export default Index;