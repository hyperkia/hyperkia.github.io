function Index(data){
    for( let [lOldId, lObj] of Object.entries(data.layers) ) {

	// src    
	const srcAssetId = lObj.attributes.src;
	if(srcAssetId && data.idsMap[srcAssetId]) lObj.attributes.src = data.idsMap[srcAssetId];

	// href
	const hrefAssetId = lObj.attributes.href;
	if(hrefAssetId && data.idsMap[hrefAssetId]) lObj.attributes.href = data.idsMap[hrefAssetId];

    };

}

export default Index;