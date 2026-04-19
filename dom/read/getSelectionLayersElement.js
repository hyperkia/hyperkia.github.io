function Index() {
	const elements = [];
	for(const key of KIA.state.ui.getSelectionId()) {
		const el = KIA.kiaCanvas._qs(`[data-layer="${key}"]`);
		el && (elements.push(el));
	}	
	return elements;
}

export default Index;