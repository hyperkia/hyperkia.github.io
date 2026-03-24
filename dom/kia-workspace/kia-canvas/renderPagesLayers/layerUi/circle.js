function Index(l) {
    const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    const shapeAttrs = Object.entries(l.sattrs).map(([k, v]) => `${k}="${v}"`).join(' ');

    return `
    	<svg class="canvas-layer" ${svgAttrs} data-layer="${l.key}">
            <circle ${shapeAttrs} data-svgshape="${l.key}"></circle>
        </svg>
    `;
}

export default Index;