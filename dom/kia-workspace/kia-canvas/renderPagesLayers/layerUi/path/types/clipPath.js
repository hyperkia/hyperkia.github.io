function Index(l) {

let baseLayer = '';
let clipSiblingLayer = '';

l.clipBaseLayer.forEach((bl)=>{
	baseLayer += `<path data-name="${bl.name}" d="${bl.d}" fill="${bl.fill}" transform="translate(${bl.left}px,${bl.top}px)"></path>`;
})

l.clipSiblingLayer.forEach((csl)=>{
	clipSiblingLayer += `<path data-name="${csl.name}" d="${csl.d}" fill="${csl.fill}" transform="translate(${csl.left},${csl.top})"></path>`;
})

return `
	<svg class="canvas-layer" data-layer="${l.key}" viewBox="0 0 ${l.css.width.replace('px','')} ${l.css.height.replace('px','')}" xmlns="http://www.w3.org/2000/svg">
		${baseLayer}
		${clipSiblingLayer}
	</svg>
`;
}

export default Index;	