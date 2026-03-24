function Index(l) {
	return `
		 <div class="canvas-layer documenthtml" data-layer="${l.key}" draggable="false">
		 	<iframe src="${l.attrs.src}" loading="lazy"></iframe>
		 </div>
	`;
}

export default Index;