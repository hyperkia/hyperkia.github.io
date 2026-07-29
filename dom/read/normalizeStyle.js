function Index(style){
	const result = structuredClone(style);

	// Mask Image
	const assetObj = KIA.state.assets.getAssets()[style['mask-image']];
	if(assetObj) {
		result['mask-image'] = `url(${assetObj.url})`;
		result['-webkit-mask-image'] = `url(${assetObj.url})`;
	}

	return result;
}

export default Index;