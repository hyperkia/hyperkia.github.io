function Index() {
	const id = KIA.state.ui.getSelectionId();
	return KIA.kiaCanvas._qs(`[data-page-name="${id}"]`);
}

export default Index;