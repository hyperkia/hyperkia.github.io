function Index(){
	const dirtyPage = KIA.state.ui.getProp('dirtyMap').page;
	if(dirtyPage.flag !== 'style') return;
	const pageEl = KIA.canvasRefMap[dirtyPage.id];
	const pageObj = KIA.nodesMap[dirtyPage.id];
	
	KIA.state.ui.getProp('dirtyMap').page.style.forEach((p)=>{
		pageEl.style[p] = pageObj.style[p];
	});

	if(pageObj.style.visibility) KIA.kiaCanvas._qs(`[data-page-name="${pageObj.id}"]`).style.visibility = pageObj.style.visibility;
}

export default Index;