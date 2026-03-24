function Index(l) {
    const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    const shapeAttrs = Object.entries(l.sattrs).map(([k, v]) => `${k}="${v}"`).join(' ');

    return `
    	<svg class="canvas-layer" ${svgAttrs} data-layer="${l.key}">
            <line ${shapeAttrs} data-svgshape="${l.key}"></line>
        </svg>
    `;
}

export default Index;