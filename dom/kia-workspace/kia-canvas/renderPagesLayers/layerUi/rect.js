function Index(l) {
    const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    const shapeAttrs = Object.entries(l.sattrs).map(([k, v]) => `${k}="${v}"`).join(' ');

    let fillGradient = undefined;
    if(l.gradient) fillGradient = `url(#${KIA.registry.svgGradient.createRegistry(l.gradient)})`;
    if(fillGradient) {
        const layerAttrs = Object.assign({}, l.attrs, {fill: fillGradient})
        shapeAttrs = Object.entries(layerAttrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    }

    let html = '';

    // rect
    if(l.clipPath) {
        html += `
            <defs>
                <clipPath id="${l.key}-arrow">
                  <rect ${shapeAttrs} data-svgshape="${l.key}"></rect>
                </clipPath>
            </defs>
        `;
    } else {
        html += `<rect ${shapeAttrs} data-svgshape="${l.key}"></rect>`;
    }

    // clippath
    if(l.clipPath) {
        l.clipPath.forEach((c)=>{           
            html += `<image x="${c.left}" y="${c.top}" width="${c.width}" height="${c.height}" href="${c.src}" clip-path="url(#${l.key}-arrow)" />`;
        })
    }

    return `
    	<svg class="canvas-layer" xmlns="http://www.w3.org/2000/svg" ${svgAttrs} data-layer="${l.key}">${html}</svg>
    `;
}

export default Index;