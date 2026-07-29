import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style['width'] = layerMethods.extractWidth(node);

	let fontSize = node.text.style?.['font-size'] || 16;
	if(fontSize) {
		const transform = node.text.transform;	
        fontSize = fontSize * (transform?.[3] ?? 1);
        const leftGlyph = parseFloat(fontSize) * 0.09;
    	nodeObj.style.width = Math.ceil(parseFloat(nodeObj.style.width) + (leftGlyph*2)) + 'px';
    }
}

export default Index;