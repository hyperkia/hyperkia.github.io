
import props from '../../../../props/index.js';
import collectAdditionalData from './collectAdditionalData.js';

function Index() {

	const l = props.activeParseLayer.layer;
	
	const obj = {
		nodeName: 'img',
		css: {},
		attrs: {},
	};

	obj.canvas = l.canvas || null;
 
	collectAdditionalData(obj); 

	return obj;
}

export default Index;

