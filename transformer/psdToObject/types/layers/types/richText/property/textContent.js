
import props from '../../../../../utils/props.js';

function Index(nodeObj) {

	const node = props.nodes[nodeObj.id];
if(node.name === 'line-height-high') console.log(node);
    const text = node.text.text;
    const styleRuns = node.text.styleRuns;

    let index = 0;
    let html = '';

    const transform = node.text.transform;
    
    for (const run of styleRuns) {
        let style = '';

        // Color
        const fillColor = run.style.fillColor || node.text.style.fillColor;
    	const color = fillColor && KIA.utils.color.rgbToHex(fillColor);
        if(color) style += `color:${color};`;

        // Text Transform
        const fontCaps = run.style?.fontCaps || node.text.style?.fontCaps;
        if(fontCaps === 1) style += `font-variant:small-caps;`;
        if(fontCaps === 2) style += `text-transform:uppercase;`;

        // Font Family
    	const fontFamily = run.style?.font?.name || node.text.style?.font?.name || '';
        if(fontFamily) style += `font-family:${fontFamily};`;
        props.fonts.add(fontFamily);

        // Font Size
        let fontSize = run.style?.fontSize || node.text.style?.fontSize || '';
    	if(fontSize) {
            fontSize = fontSize * (transform?.[3] ?? 1);
            style += `font-size:${fontSize}px;`;
        }

        // Font Weight
        let fontWeight = 400;
    	if(fontFamily.toLowerCase().indexOf('bold')>=0) fontWeight = 700;
    	if(fontFamily.toLowerCase().indexOf('semibold')>=0) fontWeight = 600;
    	if(fontFamily.toLowerCase().indexOf('medium')>=0) fontWeight = 500;
        style += `font-weight:${fontWeight};`;

        // Line Height
        const autoLeading = run.style?.autoLeading ?? node.text.style?.autoLeading;
        let leading = run.style?.leading ?? node.text.style?.leading;
        let finalLineHeight = fontSize;
        if (autoLeading || leading == null) {
            finalLineHeight = fontSize * 1.2;
        } else {
            const scaleY = Math.hypot(transform[2], transform[3]);
            leading *= scaleY;
            finalLineHeight = leading;
        }
        style += `line-height:${KIA.utils.number.cleanNumber(finalLineHeight)}px;`;


        const slice = text.slice(index, index + run.length);
        index += run.length;
        html += `<span style="${style}">${KIA.utils.string.escapeHtml(slice)}</span>`;
    }

    nodeObj.textContent = html;
}

export default Index;
