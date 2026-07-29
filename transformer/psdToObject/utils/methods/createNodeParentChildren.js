
import props from '../props.js';

function parseNode(node){
	if(!props.nodes[node.hyperkiaId]) return
	node.hyperkiaChildren = [];
	node.children?.forEach((c)=>{
		if(c.hidden) return;
		if(c.hyperkiaPsd.layerType === 'unknown') return;
		node.hyperkiaChildren.push(c.hyperkiaId);
		c.hyperkiaParent = node.hyperkiaId;
	})
}

function treeWalk(node) {
	node.children && node.children.forEach((node)=>{
		treeWalk(node)
	})
	parseNode(node);
}

function Index(){
	treeWalk(props.rawPsd);
}

export default Index;