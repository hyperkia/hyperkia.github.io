function Index() {
	const pagerEl = KIA.dom.read.getSelectionPageElement();
	const key = pagerEl.dataset.page;

	KIA.kiaCanvas.$id['page'+key].remove();
	KIA.kiaCanvas.$id['pageName'+key].remove();

	delete KIA.kiaCanvas.$id['page'+key];
	delete KIA.kiaCanvas.$id['pageName'+key];
}

export default Index;