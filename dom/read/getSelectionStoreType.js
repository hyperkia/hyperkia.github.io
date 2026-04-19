function Index() {
	const id = KIA.state.ui.getSelectionId();
	if(KIA.state.layers.getProp('map')?.[id]) return 'layers';
	if(KIA.state.pages.getProp('map')?.[id]) return 'pages';
	return 'canvas';
}

export default Index;