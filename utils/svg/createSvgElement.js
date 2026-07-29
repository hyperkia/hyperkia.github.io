const SVG_NS = 'http://www.w3.org/2000/svg';

function Index(tagName, attrs = {}, children = []){
	const el = document.createElementNS(SVG_NS, tagName);

	for(const [key, value] of Object.entries(attrs)){
		if(value === undefined || value === null) continue;

		el.setAttribute(key, value);
	}

	children.forEach((child)=>{
		if(child) el.appendChild(child);
	});

	return el;
};

export default Index;