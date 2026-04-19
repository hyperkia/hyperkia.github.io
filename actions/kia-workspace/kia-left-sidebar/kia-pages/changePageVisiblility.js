function Index(id) {
	const pageObj = KIA.nodesMap[id];
	const style = {
		visibility: (pageObj.style.visibility === 'visible' ? 'hidden' : 'visible'),
	};
	const newPageObj = {
		id,
		style,
	}
	KIA.state.pages.setStyle(newPageObj);
	KIA.services.idb.core.replaceObjectByKey('pages', pageObj);
}

export default Index;