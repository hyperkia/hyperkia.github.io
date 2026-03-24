function Index() {
	const key = KIA.state.pages.pointerLockKey;
	const pageObj = KIA.state.pages.map[key];
	const pageEl = KIA.kiaCanvas._qs(`[data-page="${key}"]`);
	pageEl.dataset.lock = pageObj.css['pointer-events'];
}

export default Index;