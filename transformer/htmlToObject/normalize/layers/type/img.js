
import props from '../../../utils/props.js';
import attributes from '../attributes/index.js';

function Index(){
	const l = props.activeParseLayer.layer;
	const lAttrs = l.attributes;

	const obj = {
		attrs: {},
	};
	
	for(let atr in attributes) Object.assign(obj.attrs, attributes[atr](lAttrs));

	return obj;
}

export default Index;