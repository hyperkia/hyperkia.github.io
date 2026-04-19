
import props from '../../../../props/index.js';
import cssProps from './props/index.js';
import collectAdditionalData from './collectAdditionalData.js';

function Index() {

	const l = props.activeParseLayer.layer;
	console.log(l.name, l);
	const obj = {
		nodeName: 'img',
		css: {},
		attrs: {},
		type: 'imghtml',
	};

	obj.canvas = l.canvas || null;

	for(let p in cssProps) Object.assign(obj.css, cssProps[p](l));
 
	collectAdditionalData(obj); 

	return obj;
}

export default Index;

