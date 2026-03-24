function Index(l) {

return;
	// img
	if(!l.clipPath) {
		return `<img class="canvas-layer imghtml" src="${l.attrs.src||''}" draggable="false" data-layer="${l.key}" />`;	
	} else {
		return KIA.utils.dom.getRasterClipPath(l); 
	}
	
}

export default Index;