function Index() {
	const id = KIA.state.ui.getSelectionId();
	return KIA.nodesMap[id];
}

export default Index;