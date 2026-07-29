
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function Index(){
	props.rawPsd.children.forEach((cNode, i)=>{
		if(cNode.clipping) return;
		const nextChildNode = props.rawPsd.children[i+1];		
		if(!nextChildNode?.clipping) return;

		let nextClippingNodes = [cNode.hyperkiaId];
		let foundNonClip = false;
		props.rawPsd.children.forEach((ncn, k)=>{
			if(k>i && !foundNonClip) {				
				if(!ncn.clipping) {
					foundNonClip = true;
					return;
				}
				nextClippingNodes.push(ncn.hyperkiaId);
			}
		});

		const parentObj = props.nodesObj[cNode.hyperkiaParent];

		const svgObj = {
	        id: crypto.randomUUID(),
	        title: '',
	        tagName: 'svg',
	        parent: parentObj.id,
	        instanceof: 'svg',
	        attributes: {},
	        style: {},
	        children: structuredClone(nextClippingNodes),
	        stack: [],
	    };

	    const cNodeIndex = parentObj.children.indexOf(nextClippingNodes[0]);
	    nextClippingNodes.forEach((id)=>{
	    	const index = parentObj.children.indexOf(id);
			if (index !== -1) parentObj.children[index] = undefined;
			const lObj = props.nodesObj[id];
			lObj.parent = svgObj.id;
	    })

	    parentObj.children[cNodeIndex] = svgObj.id;	    
	    props.parse.layers[svgObj.id] = svgObj;
	    props.nodesObj[svgObj.id] = svgObj;
	})
}

export default Index;