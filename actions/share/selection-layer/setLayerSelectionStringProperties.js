
let debounceTimeout = null;

function Index(layerNewObj){
    const isModifyStringProps = KIA.utils.obj.getStringProps(layerNewObj,['key']);
    if(isModifyStringProps.length === 0) return;
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    KIA.state.layers.setSelectionStringProperties(layerNewObj);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);    	
    }, 150);
}

export default Index;