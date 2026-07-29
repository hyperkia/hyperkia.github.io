
import props from '../props.js';

function Index(layerId){
	let ancestorNode = props.nodes[layerId];
	let i = 0;
	while(ancestorNode) {
		if(ancestorNode.hyperkiaPsd?.anyClippingSibling) return true;
		ancestorNode = props.nodes[ancestorNode.hyperkiaParent];
		if(i === 100) break;
		i++;
	}
	return false;
}

export default Index;