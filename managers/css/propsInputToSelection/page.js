
function Index(css) {
	const pageObj = KIA.dom.read.getSelectionPageObject();

	const pageNewObj = {
		key: pageObj.key,
		css,
	}
    KIA.actions.share.setPageSelectionCss(pageNewObj);
}

export default Index;