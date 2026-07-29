
function Index(){
	const id = KIA.state.ui.getSelectionId();
	const objectStore = KIA.dom.read.getObjectStoreNameById(id);
	if(objectStore === 'layers') {
		KIA.actions.kiaLayers.deleteLayer(id);
	} if(objectStore === 'pages') {
		KIA.actions.kiaPages.deletePage(id);
	}
    
}

export default Index;