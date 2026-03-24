function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	return KIA.kiaCanvas._qs(`[data-page-name="${key}"]`);
}

export default Index;