
import props from '../../../utils/props.js';

function parseNode(node){
	if(node.hyperkiaPage) return;
	let ancestorId = node.hyperkiaParent;
	while(ancestorId){
		if(! props.parse.layers[ancestorId]) break;
		if(! node.children) break;
		if(props.parse.layers[ancestorId].tagName === 'g') {
			const lObj = props.parse.layers[node.hyperkiaId];
			lObj.tagName = 'g';
			lObj.instanceof = 'svg';
			lObj.attributes.transform = `translate(${lObj.style.left},${lObj.style.top})`.replaceAll('px','');
			delete lObj.style.left;
			delete lObj.style.top;
			break;
		}

		ancestorId = props.nodes[ancestorId].hyperkiaParent;
	}
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