function Index(){
	const pageObj = KIA.dom.read.getSelectionPageObject();
	if(!pageObj) return;
	KIA.kiaLayers._qs(`[data-item="${pageObj.id}"] .header`).setAttribute('data-title', pageObj.title);
}

export default Index;