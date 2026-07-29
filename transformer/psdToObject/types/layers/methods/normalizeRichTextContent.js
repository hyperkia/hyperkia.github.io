
import props from '../../../utils/props.js';


function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!lObj.textContent?.includes('</span>')) continue;                            

		const parser = new DOMParser();
		const doc = parser.parseFromString(lObj.textContent, "text/html");

		const spans = [...doc.body.querySelectorAll("span")];

		const firstStyle = spans[0].getAttribute("style");

		const allSame = spans.every(
			(span) => span.getAttribute("style") === firstStyle
		);

		if (!allSame) continue;

		lObj.textContent = spans.map(span => span.textContent).join("");
		const style = KIA.utils.css.cssToObject(firstStyle);
		Object.assign(lObj.style, style);
	}
}

export default Index;