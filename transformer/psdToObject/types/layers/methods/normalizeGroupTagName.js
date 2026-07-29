
import props from '../../../utils/props.js';

function parseNode(node){
	if(node.hyperkiaPsd?.anyClippingSibling) {
		const lObj = props.parse.layers[node.hyperkiaId];
		if(!lObj) return;
		lObj.tagName = 'g';
		lObj.instanceof = 'svg';
		lObj.attributes.transform = `translate(${lObj.style.left},${lObj.style.top})`.replaceAll('px','');
		
		delete lObj.style.left;
		delete lObj.style.top;
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