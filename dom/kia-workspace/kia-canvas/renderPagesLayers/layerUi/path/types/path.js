function Index(l) {

	const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    const shapeAttrs = Object.entries(l.sattrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    let fill = l.sattrs.fill;
    if(l.gradient) fill = `url(#${KIA.registry.svgGradient.createRegistry(l.gradient)})`;

	return `
		<svg data-name="${l.name}" class="canvas-layer" xmlns="http://www.w3.org/2000/svg" ${svgAttrs} data-layer="${l.key}">
	        <path ${shapeAttrs} data-svgshape="${l.key}"></path>
	    </svg>
    `;
}

export default Index;	