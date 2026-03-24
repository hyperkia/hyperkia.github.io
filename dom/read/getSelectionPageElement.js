function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	return KIA.kiaCanvas._qs(`[data-page="${key}"]`);
}

export default Index;