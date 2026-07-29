
import props from '../../../utils/props.js';


function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {
		if(!lObj.textContent?.includes('</span>')) continue;
		
		const parser = new DOMParser();
		const doc = parser.parseFromString(lObj.textContent, "text/html");

		const spans = [...doc.body.querySelectorAll("span")];

		const firstStyle = spans[0].getAttribute("style");
		const firstStyleObj = KIA.utils.css.cssToObject(firstStyle);

		const commonProps = [];
		for(let [prop,value] of Object.entries(firstStyleObj)) {
			let isPropMatch = true;
			spans.forEach((span,i)=>{
				if(isPropMatch === false) return;
				const spanStyle = span.getAttribute("style");				
				const spanStyleObj = KIA.utils.css.cssToObject(spanStyle);				
				if(spanStyleObj[prop] !== value) isPropMatch = false;
			});

			if(isPropMatch) commonProps.push(prop);
			
		};

		commonProps.forEach((cp)=>{
			spans.forEach((span)=>{
				span.style.removeProperty(cp);
			});
			lObj.style[cp] = firstStyleObj[cp];
		});

		let finalTextContent = '';
		spans.forEach((span)=>{
			const spanStyle = span.getAttribute("style");
			if(!spanStyle) finalTextContent += span.textContent;
			if(spanStyle) finalTextContent += span.outerHTML;
		})

		lObj.textContent = finalTextContent;
	}
}

export default Index;