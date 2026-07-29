
import props from '../props.js';

function parseNode(node){
	node.children?.forEach((child)=>{
		if(child.clipping && node.hyperkiaPsd && !node.hyperkiaPsd.anyClippingSiblingParsed) {						
			node.hyperkiaPsd.anyClippingSiblingParsed = true;
			node.hyperkiaPsd.anyClippingSibling = true;
		}
	});
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