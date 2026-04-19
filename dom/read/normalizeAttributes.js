function Index(attrs){
	const result = structuredClone(attrs);
	const assetObj = KIA.state.assets.getProp('map')[attrs.src||''];

	if(assetObj) result.src = assetObj.url;

	return result;
}

export default Index;