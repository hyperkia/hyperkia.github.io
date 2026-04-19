function Index(id) {
	const id = KIA.state.ui.getSelectionId();
	const stack = KIA.state.layers.map[id].stack;
	return stack.find(s => s.id===id);
}

export default Index;