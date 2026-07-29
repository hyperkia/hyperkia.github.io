
import props from '../../../utils/props.js';


function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {
		if(!lObj.style['mix-blend-mode']) continue;
		if(lObj.tagName !== 'path') continue;
		if(lObj.style['mix-blend-mode'] === 'normal') continue;

		const parentObj = props.nodesObj[lObj.parent];
		parentObj.style['mix-blend-mode'] = lObj.style['mix-blend-mode'];

		delete lObj.style['mix-blend-mode'];
	}
}

export default Index;