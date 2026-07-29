function Index(){
	const id = KIA.state.ui.getSelectionId();
    KIA.actions.kiaLayers.groupLayer(id);
}

export default Index;