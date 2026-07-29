
import props from '../../../../utils/props.js';
import base from '../base.js';

import style from './style/index.js';

function Index(node){
	const nodeObj = base(node);

	nodeObj.tagName = 'DIV';
	nodeObj.instanceof = 'html';

	for(const prop in style) {
		style[prop](nodeObj);
	}

	props.parse.layers[nodeObj.id] = nodeObj;
	props.nodesObj[nodeObj.id] = nodeObj;
}

export default Index;