
import props from '../../../../utils/props.js';
import base from '../base.js';

import style from './style/index.js';
import attributes from './attributes/index.js';

async function Index(node){
	const nodeObj = base(node);

	nodeObj.tagName = 'image';
	nodeObj.instanceof = 'svg';

	for(const prop in style) {
		await style[prop](nodeObj);
	}

	for(const attr in attributes) {
		await attributes[attr](nodeObj);
	}

	props.parse.layers[nodeObj.id] = nodeObj;
	props.nodesObj[nodeObj.id] = nodeObj;
}

export default Index;