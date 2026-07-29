
import props from '../../../utils/props.js';


function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {
		if(!lObj.textContent?.includes('</span>')) continue;		
		const parser = new DOMParser();
		const doc = parser.parseFromString(lObj.textContent, "text/html");

		const parentLineHeight = parseInt(props.nodesObj[lObj.parent].style['line-height']);		
		const spans = [...doc.body.querySelectorAll("span")];
		spans.forEach((spanEl)=>{
			const spanFontSize = parseInt(spanEl.style.fontSize);
			const spanLineHeight = parseInt(spanEl.style.lineHeight) || parentLineHeight || spanFontSize;
			spanEl.style.lineHeight = spanLineHeight+'px';
		})

		let finalTextContent = '';
		spans.forEach( span => finalTextContent += span.outerHTML );
		lObj.textContent = finalTextContent;
	}
}

export default Index;