function Index(){
	const id = KIA.state.ui.getSelectionId();
    KIA.actions.kiaLayers.copyLayer(id);
}

export default Index;