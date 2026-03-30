
import methods from '../../../methods/index.js';

function Index(layer) {	
	const result = {};
	const fillColor = layer.text.style?.fillColor;
	let value = '';
	if(fillColor) value = methods.fillColor(fillColor);
	if(value) result.color = value;
	return result;
}

export default Index;