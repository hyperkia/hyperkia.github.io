import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];	
	const fontCaps = node.text.style?.fontCaps;
	if(fontCaps === 1) nodeObj.style['font-variant'] = 'small-caps';
	if(fontCaps === 2) nodeObj.style['text-transform'] = 'uppercase';
}

export default Index;