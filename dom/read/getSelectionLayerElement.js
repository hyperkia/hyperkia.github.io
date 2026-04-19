function Index() {
	const id = KIA.state.ui.getSelectionId();
	return KIA.kiaCanvas._qs(`[data-layer="${id}"]`);
}

export default Index;