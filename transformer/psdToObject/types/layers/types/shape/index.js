
import props from '../../../../utils/props.js';
import base from '../base.js';

import style from './style/index.js';
import attributes from './attributes/index.js';

function Index(node){
	const nodeObj = base(node);

	nodeObj.tagName = 'rect';
	nodeObj.instanceof = 'svg';

	for(const prop in style) {
		style[prop](nodeObj);
	}

	for(const attr in attributes) {
		attributes[attr](nodeObj);
	}

	props.parse.layers[nodeObj.id] = nodeObj;
	props.nodesObj[nodeObj.id] = nodeObj;

	
}

export default Index;