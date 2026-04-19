function Index(element) {
	if(element.closest('[data-layer]')) return 'layer';
	if(element.closest('[data-page]')) return 'page';	
	return 'canvas';
}

export default Index;