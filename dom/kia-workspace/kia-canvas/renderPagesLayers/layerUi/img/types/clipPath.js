function Index(l) {
    let baseLayer = '';
    let clipSiblingLayer = '';

    l.clipBaseLayer.forEach((bl) => {
        if (bl.nodeName === 'img') baseLayer += `<image data-name="${bl.name}" href="${URL.createObjectURL(bl.blob)}" width="${bl.width}" height="${bl.height}" />`;
        if (bl.nodeName === 'path') baseLayer += `<path data-name="${bl.name}" d="${bl.d}" fill="${bl.fill}" transform="translate(${bl.left}px,${bl.top}px)"></path>`;
    })

    l.clipSiblingLayer.forEach((csl) => {
        clipSiblingLayer += `<image data-name="${csl.name}" href="${URL.createObjectURL(csl.blob)}" width="${csl.width}" height="${csl.height}" mask="url(#${l.key}-mask)" />`;
    })

    return `
	<svg class="canvas-layer" data-layer="${l.key}" viewBox="0 0 ${l.css.width.replace('px','')} ${l.css.height.replace('px','')}" xmlns="http://www.w3.org/2000/svg">
		<defs>
		  <mask id="${l.key}-mask" maskUnits="userSpaceOnUse" mask-type="alpha">
			${baseLayer}
		  </mask>
		</defs>
		${clipSiblingLayer}			
	</svg>
`;
}

export default Index;