function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	if(KIA.state.layers.map[key]) return 'layers';
	if(KIA.state.pages.map[key]) return 'pages';
	return 'canvas';
}

export default Index;