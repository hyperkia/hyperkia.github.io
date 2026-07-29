
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function hasSvgParent(layer){
	let parentId = layer.parent;

	while(parentId){
		const parent = props.nodesObj[parentId];

		if(parent?.tagName === 'svg') return true;
		parentId = parent?.parent;
	}

	return false;
}

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!['rect','path'].includes(lObj.tagName)) continue;
		if(hasSvgParent(lObj)) continue;		
		if(lObj.clipping) continue;

		const lObjParentObj = props.nodesObj[lObj.parent];
		let isNextSiblingClipping = false;
		lObjParentObj.children.forEach((cId,i)=>{
			const nextSibling = props.nodes[lObjParentObj.children[i+1]];
			if(cId === lId && nextSibling?.clipping) isNextSiblingClipping = true;
		});
		if(isNextSiblingClipping && lObjParentObj.instanceof==='document') continue;

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

export default Index;