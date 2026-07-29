function Index(){
	const dirtyPage = KIA.state.ui.getProp('dirtyMap').page;
	if(dirtyPage.flagType !== 'lockVisibility' ) return;

	const pageObj = KIA.nodesMap[dirtyPage.id];
	const pageEl = KIA.kiaPages._qs(`[data-page="${pageObj.id}"]`);
	dirtyPage.style.forEach((s)=>{
		if(s==='visibility') pageEl.querySelector('.page-visible').dataset.visibility = pageObj.style.visibility;
		if(s==='pointer-events') pageEl.querySelector('.page-lock').dataset.lock = pageObj.style['pointer-events'];
	})
}

export default Index;