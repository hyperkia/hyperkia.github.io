
function Index(){
	const id = KIA.state.ui.getSelectionId();
	const objectStore = KIA.dom.read.getObjectStoreNameById(id);
	if(objectStore === 'layers') {
		KIA.actions.kiaLayers.changeVisibility(id);
	} if(objectStore === 'pages') {
		KIA.actions.kiaPages.changeVisibility(id);
	}
    
}

export default Index;