function Index() {
	const id = KIA.state.ui.getSelectionId();
	const selectionObj = KIA.nodesMap[id];

	if(selectionObj && ['html','svg'].includes(selectionObj.instanceof)) return 'layers';
	if(selectionObj && selectionObj.instanceof === 'document') return 'pages';

	return 'canvas';
}

export default Index;