function Index() {
	const dirtyPage = KIA.state.ui.getProp('dirtyMap').page;
	if(dirtyPage.flag !== 'deletePage') return;

	KIA.canvasRefMap[dirtyPage.id].querySelectorAll('*').forEach( l => l.remove() );
	KIA.canvasRefMap[dirtyPage.id].remove();
	KIA.kiaCanvas.$id['pageName'+dirtyPage.id].remove();
	delete KIA.canvasRefMap[dirtyPage.id];
	
	KIA.dom.share.removeDisConnectedDomNodes(KIA.canvasRefMap);
	KIA.dom.share.removeDisConnectedDomNodes(KIA.kiaCanvas.$id);	
}

export default Index;