
function Index(){
	const id = KIA.state.ui.getSelectionId();
	const objectStore = KIA.dom.read.getObjectStoreNameById(id);
	if(objectStore === 'layers') {
		KIA.actions.kiaLayers.changeLock(id);
	} if(objectStore === 'pages') {
		KIA.actions.kiaPages.changeLock(id);
	}
    
}

export default Index;