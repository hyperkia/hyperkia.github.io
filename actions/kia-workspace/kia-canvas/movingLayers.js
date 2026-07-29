
let debounceTimeout = null;

function Index(layersObj) {
	KIA.state.layers.movingLayers(layersObj);
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.updateObjects('layers', layersObj.layers);
    }, 150);
	
}

export default Index;