function Index(element) {
	if(element.closest('[data-layer]')) {
		return element.closest('[data-layer]').dataset.layer;
	}
	
	if(element.closest('[data-page]')) {
		return element.closest('[data-page]').dataset.page;
	}
	
	return 'canvas';
}

export default Index;