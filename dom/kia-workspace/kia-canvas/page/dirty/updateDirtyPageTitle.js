function Index(){
	const dirtyPage = KIA.state.ui.getProp('dirtyMap').page;
	if(dirtyPage.flag !== 'title') return;

	const pageObj = KIA.nodesMap[dirtyPage.id];
	KIA.kiaCanvas._qs(`[data-page-name="${pageObj.id}"]`).textContent = pageObj.title;
}

export default Index;