function Index(){
	const id = KIA.state.ui.getSelectionId();
	delete this.map[id];
	delete KIA.nodesMap[id];
	KIA.observer.pages.observe('deleteSelectedPage');
}

export default Index;