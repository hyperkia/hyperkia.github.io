
let debounceTimeout = null;

function Index(layerNewObj){
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    KIA.state.layers.setSelectionAttributes(layerNewObj);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);    	
    }, 150);
}

export default Index;