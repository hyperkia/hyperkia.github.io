import props from '../../../../../utils/props.js';
import layerMethods from '../../../methods/index.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	nodeObj.style['width'] = layerMethods.extractWidth(node);

	const run1 = node.text.styleRuns[0];
	let fontSize = run1.style?.fontSize || node.text.style?.fontSize || '';
	const transform = node.text.transform;	
	if(fontSize) {
        fontSize = fontSize * (transform?.[3] ?? 1);
        const leftGlyph = parseFloat(fontSize) * 0.09;
    	nodeObj.style.width = Math.ceil(parseFloat(nodeObj.style.width) + (leftGlyph*2)) + 'px';
    }	
}

export default Index;