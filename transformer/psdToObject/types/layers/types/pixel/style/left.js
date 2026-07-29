import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style.left = node.left + 'px';
}

export default Index;