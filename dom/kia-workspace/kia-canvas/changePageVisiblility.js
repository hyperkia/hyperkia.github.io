function Index() {
	const key = KIA.state.pages.visibilityKey;
	const pageObj = KIA.state.pages.map[key];
	const pageEl = KIA.kiaCanvas._qs(`[data-page="${key}"]`);
	const pageNameEl = KIA.kiaCanvas._qs(`[data-page-name="${key}"]`);
	pageEl.dataset.visibility = pageObj.css.visibility;
	pageNameEl.dataset.visibility = pageObj.css.visibility;
}

export default Index;