
import props from '../../../../../utils/props.js';

const top = [];
const bottom = [];

function parseNode(nodeObj){
	const node = props.nodes[nodeObj.id];
	if(node.children) return;
	top.push(parseInt(node.top));
	bottom.push(parseInt(node.bottom));
}

function treeWalk(nodeObj) {
	nodeObj?.children && nodeObj.children.forEach((nodeId)=>{
		treeWalk(props.nodesObj[nodeId])
	})
	nodeObj && parseNode(nodeObj);
}

function Index(nodeObj){
	top.length = 0;
	bottom.length = 0;
	treeWalk(nodeObj);
	nodeObj.style.height = Math.max(...bottom) - Math.min(...top) + 'px';	
}

export default Index;