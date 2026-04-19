function Index() {
	const id = KIA.state.ui.getSelectionId();
	return KIA.state.layers.getProp('map')[id] || KIA.state.pages.getProp('map')[id];
}

export default Index;