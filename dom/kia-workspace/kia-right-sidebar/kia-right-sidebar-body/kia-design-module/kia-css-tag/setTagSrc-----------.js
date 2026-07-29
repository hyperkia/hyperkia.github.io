function Index(innerTextObj) {
	const asset = KIA.state.assets.selectedAsset;
	const inputEl = KIA.kiaCssTag.$id.tagSrc;
	inputEl.value = asset.url;
	inputEl.dispatchEvent(new CustomEvent('input', {
	  bubbles: true,
	  composed: true,
	  detail: {
	  	assetKey: asset.key
	  }
	})); 
	KIA.kiaApp.dispatchEvent(new CustomEvent('assetSelected', {
        bubbles: true,
        composed: true,
        detail: { source: 'kiaCssTag', assetKey: asset.key }
    }));
} 

export default Index;