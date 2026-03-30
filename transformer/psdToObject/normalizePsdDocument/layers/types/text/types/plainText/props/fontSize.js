
import methods from '../../../methods/index.js';

function Index(layer) {
	const result = {};
	const fontSize = layer.text.style?.fontSize || undefined;
	const transform = layer.text?.transform || undefined;
    const finalFontSize = methods.fontSize(fontSize, transform);
	if(finalFontSize) result['font-size'] = finalFontSize+'px';
	return result;
}

export default Index;