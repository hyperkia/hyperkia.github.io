
let debounceTimeout = null;

function Index(layerNewObj) {
	KIA.state.layers.setSelectionStack(layerNewObj);
    layerNewObj.css = KIA.dom.read.getSelectionStackCss();
    KIA.state.layers.setSelectionCss(layerNewObj);
    const layerObj = KIA.dom.read.getSelectionLayerObject();
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        for(let k in layerObj.stack) {
            const s = layerObj.stack[k];
            if(s.trash) delete layerObj.stack[k];
        }
        KIA.services.idb.core.replaceObjectByKey('layers', layerObj);
    }, 150); 
}

export default Index;