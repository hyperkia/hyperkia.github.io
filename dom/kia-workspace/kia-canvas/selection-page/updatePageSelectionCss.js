function Index(){
	const pageObj = KIA.dom.read.getSelectionPageObject();
	const pageEl = KIA.dom.read.getSelectionPageElement();
	Object.assign(pageEl.style, pageObj.css);
}

export default Index;