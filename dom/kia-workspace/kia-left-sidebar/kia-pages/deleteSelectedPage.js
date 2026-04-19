function Index() {
	const id = KIA.state.ui.getSelectionId();
	const pageEl = KIA.kiaPages._qs(`[data-page="${id}"]`);
	pageEl.remove();
}

export default Index;