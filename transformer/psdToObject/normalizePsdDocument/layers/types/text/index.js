
import props from '../../../../props/index.js';
import types from './types/index.js';

function Index() {

	const l = props.activeParseLayer.layer;
	// if(l.name === 'Title-lets') console.log(l);
	
	const obj = {
		nodeName: 'p',
		innerText: l.text.text,
		css: {},
	};

	const normalizeTextLayer = types(l);

	Object.assign(obj.css, normalizeTextLayer.css);
	if(normalizeTextLayer.innerText) obj.innerText = normalizeTextLayer.innerText;

	return obj;
}

export default Index;




