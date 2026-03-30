
import methods from '../../../methods/index.js';

function Index(layer) {
	const result = {};
	const value = layer.text.style?.font?.name || undefined;	
	if(value) result['font-family'] = value;
	return result;
}

export default Index;