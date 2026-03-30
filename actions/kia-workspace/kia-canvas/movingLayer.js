
let debounceTimeout = null;

function Index(layerObj) {
	KIA.state.layers.movingLayer(layerObj);
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.updateObject('layers', layerObj.key, {css: layerObj.css});
    }, 150);
	
}

export default Index;