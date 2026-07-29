
import props from '../props.js';

function parseNode(node){
	if(!node.children) return;
	if(node.children.length === 0) return;
	if(node.hyperkiaPage) return;

	const maxHeight = [];
	node.children.forEach((cNode)=>{
		if(cNode.hidden) return;
		if(cNode.hyperkiaPsd.layerType == "unknown") return;
		const lObj = props.parse.layers[cNode.hyperkiaId];		
		if(!lObj) return;
		maxHeight.push(parseInt(lObj.style.height) || 0);
	});
	const nObj = props.parse.layers[node.hyperkiaId];
	nObj.style.height = Math.max(...maxHeight) + 'px';
}

function treeWalk(node) {
	node.children && node.children.forEach((node)=>{
		if(!node.hidden) treeWalk(node)
	})
	if(!node.hidden) parseNode(node);
}

function Index(){
	treeWalk(props.rawPsd);
}

export default Index;