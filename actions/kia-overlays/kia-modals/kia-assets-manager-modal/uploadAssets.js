function Index(assetObj){
	const { blob, ...stateAssetObj } = assetObj;
	const { url, ...dbAssetObj } = assetObj;
	KIA.state.assets.uploadAsset(stateAssetObj);
	KIA.services.idb.core.addObject('assets', dbAssetObj); 
}

export default Index;