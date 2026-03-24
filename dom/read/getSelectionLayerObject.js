function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	return KIA.state.layers.map[key];
}

export default Index;