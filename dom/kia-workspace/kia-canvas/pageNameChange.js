function Index() {
	const pageObj = KIA.dom.read.getSelectionPageObject();
	if(!pageObj) return;
	KIA.kiaCanvas._qs(`[data-page-name="${pageObj.key}"]`).innerText = pageObj.name;
}

export default Index;