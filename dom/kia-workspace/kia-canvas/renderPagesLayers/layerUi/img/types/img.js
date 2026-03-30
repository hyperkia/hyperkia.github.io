function Index(l) {
	let src = l.attrs.src;
	if(!src) src = KIA.state.assets.map[l.assets.src]?.url;
	if(!src) src = '';
	return `<img class="canvas-layer imghtml" src="${src}" draggable="false" data-layer="${l.key}" />`;	
}

export default Index;