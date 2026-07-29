function Index(){
	const dirtyPage = KIA.state.ui.getProp('dirtyMap').page;
	if(dirtyPage.flag !== 'deletePage' ) return;

	const pageEl = KIA.kiaPages._qs(`[data-page="${dirtyPage.id}"]`);
	pageEl.remove();
}

export default Index;