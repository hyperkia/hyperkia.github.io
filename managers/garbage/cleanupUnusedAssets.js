function Index(){
	const layers = KIA.state.layers.getLayers();
	const assets = KIA.state.assets.getAssets();

	let usedAssetsId = new Set();
	for(let [lId, lObj] of Object.entries(layers)) {
		// Mask Image
		const maskImageId = lObj.style['mask-image'];
		if(maskImageId && assets[maskImageId]) usedAssetsId.add(maskImageId);

		// Src
		const srcAssetId = lObj.attributes.src;
		if(srcAssetId && assets[srcAssetId]) usedAssetsId.add(srcAssetId);

		// Href
		const hrefAssetId = lObj.attributes.href;
		if(hrefAssetId && assets[hrefAssetId]) usedAssetsId.add(hrefAssetId);
	}
	
	usedAssetsId = [...usedAssetsId];
	const deleteAssetsId = Object.keys(assets).filter(aId => !usedAssetsId.includes(aId));
	KIA.services.idb.core.deleteObjects('assets', deleteAssetsId);
	KIA.state.assets.deleteAssetsById(deleteAssetsId);
}

export default Index;