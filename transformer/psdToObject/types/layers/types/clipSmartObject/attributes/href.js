
import props from '../../../../../utils/props.js';

async function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	if(!node.canvas) return;
	const blobObj = await KIA.utils.dom.canvasToBlob(node.canvas, node.name);

	nodeObj.attributes.href = blobObj;
	
}

export default Index;