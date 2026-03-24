function Index(obj) {
	const elementRect = KIA.utils.dom.getRect(obj.element);
	const pageElRect = KIA.utils.dom.getRect(obj.pageEl);
	return {
		left: (elementRect.left - pageElRect.left) / KIA.state.ui.canvasZoom,
		top: (elementRect.top - pageElRect.top) / KIA.state.ui.canvasZoom,
	}
}

export default Index;



