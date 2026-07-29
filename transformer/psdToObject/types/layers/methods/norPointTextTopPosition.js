
import props from '../../../utils/props.js';


function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!lObj.textContent) continue;                            

		const node = props.nodes[lId];
		if(node.text?.shapeType !== 'point') continue;

		
		lObj.style.top = parseInt(lObj.style.top) - parseInt((parseInt(lObj.style.height) - (node.bottom-node.top))/2)+'px';		
	}
}

export default Index;