function Index(id){
	KIA.state.assets.selectAsset(id);
	KIA.kiaApp.dispatchEvent(new CustomEvent('assetSelected', {
        bubbles: true,
        composed: true,
        detail: { source: 'kiaAssetsManagerModal', id }
    }));
}

export default Index;