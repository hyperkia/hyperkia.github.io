function Index() {
	const id = KIA.state.ui.getSelectionId();
	const selectionObj = KIA.state.layers.getProp('map')[id] || KIA.state.pages.getProp('map')[id];
	const parentObj = KIA.state.layers.getProp('map')[selectionObj.parent] || KIA.state.pages.getProp('map')[selectionObj.parent];
	return parentObj;
}

export default Index;