function Index(l) {

	const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    const shapeAttrs = Object.entries(l.sattrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    let fill = l.sattrs.fill;
    if(l.gradient) fill = `url(#${KIA.registry.svgGradient.createRegistry(l.gradient)})`;

	let clipPart = '';
	let uiPart = '';

	// clippath
	if(l.clipPath) {
		l.clipPath.forEach((c)=>{
			if(c.tagName === 'path') clipPart += `<path  data-name="${c.name}" d="${c.d}"></path>`;
		})
		uiPart = `<path data-name="${l.name}" ${shapeAttrs} d="${l.sattrs.d}" clip-path="url(#${l.key}-arrow)"></path>`;
	}

	return `
		<svg overflow="visible" ${svgAttrs} class="canvas-layer" data-layer="${l.key}" viewBox="0 0 ${l.css.width.replace('px','')} ${l.css.height.replace('px','')}" xmlns="http://www.w3.org/2000/svg">
			<defs>
			  <clipPath id="${l.key}-arrow" clipPathUnits="userSpaceOnUse">
				${clipPart}			    
			  </clipPath>
			</defs>
			${uiPart}			
		</svg>
	`;
}

export default Index;
