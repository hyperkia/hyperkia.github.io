function Index() {
	const elements = [];
	for(const key of KIA.state.ui.selectionKeys) {
		const el = KIA.kiaCanvas._qs(`[data-layer="${key}"]`);
		el && (elements.push(el));
	}	
	return elements;
}

export default Index;