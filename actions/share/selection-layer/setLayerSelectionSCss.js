
let debounceTimeout = null;

function Index(layerNewObj){
	if(Object.keys(layerNewObj.scss).length === 0) return;
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    KIA.state.layers.setSelectionSCss(layerNewObj);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);    	
    }, 150);
}

export default Index;