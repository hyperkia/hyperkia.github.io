
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

import group from './group/index.js';
import pathShape from './pathShape/index.js';
import shape from './shape/index.js';
import smartObject from './smartObject/index.js';
import clipSmartObject from './clipSmartObject/index.js';
import text from './text/index.js';
import richText from './richText/index.js';
import pixel from './pixel/index.js';

async function Index(node){
	// if(node.name === 'Body Text-987') console.log(node);
	if(node.hidden) return;
	const layerType = node.hyperkiaPsd.layerType;	

	switch (layerType) {
		case 'group':
			await group(node);
			break;

		case 'pathShape':
			await pathShape(node);
			break;

		case 'shape':
			await shape(node);
			break;

		case 'smartObject':
			await smartObject(node);
			break;

		case 'clipSmartObject':
			await clipSmartObject(node);
			break;

		case 'text':
			await text(node);
			break;

		case 'richText':
			await richText(node);
			break;

		case 'pixel':
			await pixel(node);
			break;		
	}
}

export default Index;