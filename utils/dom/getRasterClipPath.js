function Index(l) {
	let clipPart = '';
	let uiPart = '';
	// clippath
	if(l.clipPath) {
		l.clipPath.forEach((c)=>{
			if(c.tagName === 'IMG') clipPart += `<image x="${c.left}" y="${c.top}" width="${c.width}" height="${c.height}" href="${c.src}" />`
			if(c.tagName === 'path') clipPart += `<path fill="#fff" transform="translate(${c.left}px ${c.top}px)" d="${c.d}" />`
		})
		uiPart = `<image x="0" y="0" width="${l.css.width.replace('px','')}" height="${l.css.height.replace('px','')}" href="${l.attrs.src}" mask="url(#${l.key}-arrow)" />`;	
	}

 // if(l.name === 'girl-handshake') {
 // 	console.log(l);
 // 	console.log(clipPart);
 // }

	return `
		<svg class="canvas-layer" data-layer="${l.key}" viewBox="0 0 ${l.css.width.replace('px','')} ${l.css.height.replace('px','')}" xmlns="http://www.w3.org/2000/svg">
			<defs>
			  <mask id="${l.key}-arrow" maskUnits="userSpaceOnUse">
				${clipPart}
			  </mask>
			</defs>
			${uiPart}			
		</svg>
	`;
}

export default Index;