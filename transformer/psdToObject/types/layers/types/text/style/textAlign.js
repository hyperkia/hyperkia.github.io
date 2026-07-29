import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const textAlign = node.text.paragraphStyle?.justification;
	if(!textAlign) return;
	if(textAlign === 'left') return;
	nodeObj.style['text-align'] = textAlign;
}

export default Index;