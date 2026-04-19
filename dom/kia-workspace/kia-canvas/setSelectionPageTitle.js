function Index() {
	const pageObj = KIA.dom.read.getSelectionPageObject();
	if(!pageObj) return;
	KIA.kiaCanvas._qs(`[data-page-name="${pageObj.id}"]`).textContent = pageObj.title;
}

export default Index;