
import methods from '../../../methods/index.js';

function Index(layer) {

    const text = layer.text.text;
    const styleRuns = layer.text.styleRuns;

    let index = 0;
    let html = '';

    for (const run of styleRuns) {
        let style = '';

        const fillColor = run.style.fillColor || layer.text.style.fillColor;
    	const color = methods.fillColor(fillColor);
        if(color) style += `color:${color};`

    	const fontFamily = run.style?.font?.name || layer.text.style?.font?.name || undefined;
        if(fontFamily) style += `font-family:${fontFamily};`;

        const fontSize = run.style?.fontSize || layer.text.style?.fontSize || undefined;
    	const transform = layer.text?.transform || undefined;
        const finalFontSize = methods.fontSize(fontSize, transform);
    	if(finalFontSize) style += `font-size:${finalFontSize}px;`;

        let fontWeight = 400;
    	if(fontFamily.toLowerCase().indexOf('bold')>=0) fontWeight = 700;
    	if(fontFamily.toLowerCase().indexOf('semibold')>=0) fontWeight = 600;
    	if(fontFamily.toLowerCase().indexOf('medium')>=0) fontWeight = 500;
        style += `font-weight:${fontWeight};`;

        // const leading = run.style.leading || layer.text.style?.leading || undefined;        
        // let finalLeading = (leading && methods.leading(leading, transform)) || 'normal';
        // if(finalLeading !== 'normal') finalLeading += 'px';
        // style += `line-height:${finalLeading};`;

        const slice = text.slice(index, index + run.length);
        index += run.length;
        html += `<span style="${style}">${KIA.utils.string.escapeHtml(slice)}</span>`;
    }

    return html;
}

export default Index;