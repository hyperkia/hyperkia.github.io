
let debounceTimeout = null;

function Index(layerNewObj){
    if(Object.keys(layerNewObj.css).length === 0) return;
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    KIA.state.layers.setSelectionCss(layerNewObj);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);    	
    }, 150);
}

export default Index;