
import props from '../../../../utils/props.js';
import base from '../base.js';

import style from './style/index.js';
import attributes from './attributes/index.js';
import property from './property/index.js';

function Index(node){
	const nodeObj = base(node);	

	nodeObj.tagName = 'path';
	nodeObj.instanceof = 'svg';

	for(const prop in style) {
		style[prop](nodeObj);
	}

	for(const attr in attributes) {
		attributes[attr](nodeObj);
	}

	for(const prop in property) {
		property[prop](nodeObj);
	}

	props.parse.layers[nodeObj.id] = nodeObj;
	props.nodesObj[nodeObj.id] = nodeObj;

}

export default Index;