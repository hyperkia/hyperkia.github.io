function Index() {
	const id = KIA.state.ui.getSelectionId();
	const selectionObj = KIA.nodesMap[id];
	const parentObj = KIA.nodesMap[selectionObj.parent];
	return parentObj;
}

export default Index;