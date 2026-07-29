import props from '../../../../../utils/props.js';

function Index(nodeObj) {
	const node = props.nodes[nodeObj.id];

	const style = node.text.style;
	if (!style) return;

	const fontSize = parseInt(nodeObj.style['font-size']);
	const tracking = style.tracking ?? 0;
	const scaleX = node.text?.transform?.[0] ?? 1;
	nodeObj.style['letter-spacing'] = ((tracking/1000)*fontSize*scaleX)+'px';
}

export default Index;