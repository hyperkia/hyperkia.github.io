
function Index(){
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	const assets = layerObj.assets;
	for (let p in assets) {
		if(assets[p]) {
			const assetKey = assets[p];
			const assetUrl = KIA.state.assets.map[assetKey].url;
			layerEl.setAttribute(p, assetUrl);
		}
	}
}

export default Index;