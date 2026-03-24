function Index() {
	const key = KIA.dom.read.getSelectionKey();
	const pageEl = KIA.kiaPages._qs(`[data-page="${key}"]`);
	pageEl.remove();
}

export default Index;