
import props from '../../../utils/props.js';

function createSvgTopMostTagName(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {
		if(!lObj.hyperkiaTopMostGTagName) continue;

		const lObjParentObj = props.nodesObj[lObj.parent];
	    const svgObj = {
	        id: crypto.randomUUID(),
	        title: '',
	        tagName: 'svg',
	        parent: lObj.parent,
	        instanceof: 'svg',
	        attributes: {},
	        style: {
	            left: lObj.attributes.left + 'px',
	            top: lObj.attributes.top + 'px',
	            width: lObj.attributes.width + 'px',
	            height: lObj.attributes.height + 'px',
	        },
	        children: [lObj.id],
	        stack: [],
	    };

	    const index = lObjParentObj.children.indexOf(lObj.id);
	    lObjParentObj.children[index] = svgObj.id;

	    lObj.parent = svgObj.id;
	    props.parse.layers[svgObj.id] = svgObj;
	    props.nodesObj[svgObj.id] = svgObj;
	}
}

function parseNode(node){
	if(node.hyperkiaPage) return;
	let ancestorId = node.hyperkiaParent;
	let ancestorGLayer = null;
	while(ancestorId){
		const ancestorLayer = props.parse.layers[ancestorId];
		if(ancestorLayer?.tagName === 'g') {
			ancestorGLayer = ancestorLayer;
		}
		ancestorId = props.nodes[ancestorId].hyperkiaParent;
	}

	if(ancestorGLayer) ancestorGLayer.hyperkiaTopMostGTagName = true;
}

function treeWalk(node) {
	node.children && node.children.forEach((node)=>{
		treeWalk(node)
	})
	parseNode(node);
}

function Index(){
	treeWalk(props.rawPsd);
	createSvgTopMostTagName();
}

export default Index;