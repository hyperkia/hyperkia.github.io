function Index(){
	const selectionId = KIA.state.ui.getSelectionId();
    KIA.actions.kiaLayers.bringToFront(selectionId);
}

export default Index;