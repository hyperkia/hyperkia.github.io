function Index(attrs){
	const result = structuredClone(attrs);

	let assetAttr = '';
	if(attrs.src) assetAttr = 'src';
	if(attrs.href) assetAttr = 'href';
	const assetObj = KIA.state.assets.getAssets()[attrs[assetAttr]];
	if(assetObj) result[assetAttr] = assetObj.url;

	return result;
}

export default Index;