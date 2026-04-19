
function Index(style) {
	const pageObj = KIA.dom.read.getSelectionPageObject();
	const newPageObj = {
		id: pageObj.id,
		style,
	};
    KIA.actions.kiaPages.setStyle(newPageObj);
}

export default Index;