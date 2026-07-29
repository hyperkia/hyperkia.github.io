
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!lObj.textContent) continue;
		const ancestorSvgId = methods.isAncestor(lObj, 'svg');
		if(!ancestorSvgId) continue;
		if(methods.isAnyNextSiblingClipping(lObj)) continue;

		const node = props.nodes[lId];

		const lObjParent = props.nodesObj[lObj.parent];
		const lObjIndex = lObjParent.children.indexOf(lId);
		lObjParent.children.splice(lObjIndex, 1);

		const ancestorSvgParentId = props.nodesObj[ancestorSvgId].parent;
		const ancestorSvgParentObj = props.nodesObj[ancestorSvgParentId];
		ancestorSvgParentObj.children.push(lId);
		
		lObj.style.top = (parseInt(lObj.style.top) - ((parseInt(lObj.style.height) - (node.bottom-node.top))/2))+'px';
	}
}

export default Index;