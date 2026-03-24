function Index(stackKey) {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	const stack = KIA.state.layers.map[key].stack;
	return stack.find(s => s.key===stackKey);
}

export default Index;