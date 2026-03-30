function Index(l){
	const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');    

    return `
    	<svg class="canvas-layer" ${svgAttrs} data-layer="${l.key}">${l.rawSvgInnerHTML}</svg>
    `;
}

export default Index;