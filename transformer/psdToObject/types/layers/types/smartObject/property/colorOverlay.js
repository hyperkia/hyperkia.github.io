import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const solidFill = node.effects?.solidFill?.[0];
	if(!solidFill || !solidFill.enabled) return;

	nodeObj.tagName = 'DIV';
	const style = {		
        'background-color': KIA.utils.color.rgbToHex(solidFill.color),

        '-webkit-mask-image': nodeObj.attributes.src,
        '-webkit-mask-repeat': 'no-repeat',
        '-webkit-mask-position': 'center',
        '-webkit-mask-size': 'contain',

        'mask-image': nodeObj.attributes.src,
        'mask-repeat': 'no-repeat',
        'mask-position': 'center',
        'mask-size': 'contain',
	};

	Object.assign(nodeObj.style, style);

	delete nodeObj.attributes.src;
}

export default Index;