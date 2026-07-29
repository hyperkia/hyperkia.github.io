function Index() {
	const id = KIA.state.ui.getSelectionId();
	return KIA.kiaCanvas._qs(`[data-page="${id}"]`);
}

export default Index;