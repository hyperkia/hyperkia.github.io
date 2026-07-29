
import props from '../../../../../utils/props.js';

const left = [];
const right = [];

function parseNode(nodeObj){
	const node = props.nodes[nodeObj.id];
	if(node.children) return;
	left.push(parseInt(node.left));
	right.push(parseInt(node.right));
}

function treeWalk(nodeObj) {
	nodeObj?.children && nodeObj.children.forEach((nodeId)=>{
		treeWalk(props.nodesObj[nodeId])
	})
	nodeObj && parseNode(nodeObj);
}

function Index(nodeObj){
	left.length = 0;
	right.length = 0;
	treeWalk(nodeObj);
	nodeObj.style.width = Math.max(...right) - Math.min(...left) + 'px';
}

export default Index;