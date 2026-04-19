function Index(id) {
	const pageObj = KIA.state.pages.getProp('map')[id];
	const style = {
		'pointer-events': (pageObj.style['pointer-events'] === 'auto' ? 'none' : 'auto'),
	};
	KIA.state.pages.changePagePointerLock(id, style);
	KIA.services.idb.core.updateObject('pages', pageObj.id, style);
}

export default Index;