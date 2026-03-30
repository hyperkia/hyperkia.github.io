
import methods from '../../../methods/index.js';

function Index(l) {
		const result = {};
		const isMultiline = l.text.text.includes('\n') || (l.text.shapeType === 'box');

		const fontSize = l.text.style?.fontSize || undefined;
		const leading = l.text.style?.leading || undefined;
		const transform = l.text?.transform || undefined;

	    const finalFontSize = fontSize && methods.fontSize(fontSize, transform);
	    const finalLeading = leading && methods.leading(leading, transform);
		const value = isMultiline ? ((finalLeading ? finalLeading : finalFontSize * 1.2)+'px') : 'normal';
	
		return {'line-height': value};
}

export default Index;