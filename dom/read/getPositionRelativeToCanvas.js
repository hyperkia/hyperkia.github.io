function Index(element) {
	const elementRect = KIA.utils.dom.getRect(element);
	const canvasRect = KIA.utils.dom.getRect(KIA.kiaCanvas);
	return {
		left: (elementRect.left - canvasRect.left)+KIA.kiaCanvas.scrollLeft,
		top: (elementRect.top - canvasRect.top)+KIA.kiaCanvas.scrollTop,
	}
}

export default Index;