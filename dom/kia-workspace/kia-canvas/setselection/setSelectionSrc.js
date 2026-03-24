function Index() {
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const url = layerObj.attrs.src;

	// YouTube
	if(layerObj.plateform === 'youtube') {
		layerEl.children[0].src = url;
	}

	// IMG
	else if(layerObj.nodeName === 'img') {
		layerEl.src = KIA.state.assets.map[layerObj.assetKey].url;
	}
	
	// Document
	else if(layerObj.nodeName === 'document') {
		const isUrl = KIA.utils.string.isValidWebsiteUrl(url);
		if(isUrl) layerEl.children[0].src = url;		
	}
}

export default Index;