import props from '../../../../../utils/props.js';


function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const fontName = node.text.style?.font.name;
	if(!fontName) return;
	props.fonts.add(fontName);
	nodeObj.style['font-family'] = fontName;
}

export default Index;

