
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	if(node.blendMode === "normal") return;
	nodeObj.style['mix-blend-mode'] = node.blendMode;
}

export default Index;