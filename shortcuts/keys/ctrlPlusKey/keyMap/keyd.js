function Index(){
	const id = KIA.state.ui.getSelectionId();
	const objectStore = KIA.dom.read.getObjectStoreNameById(id);
	if(objectStore === 'layers') {
		KIA.actions.kiaLayers.duplicateLayer(id);
	} else if(objectStore === 'pages') {
		KIA.actions.kiaPages.duplicatePage(id);
	}
    
}

export default Index;