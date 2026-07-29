function Index(){
	const selectionId = KIA.state.ui.getSelectionId();
    KIA.actions.kiaLayers.sendToBack(selectionId);
}

export default Index;