

function isMissingFont(){
	const availableFonts = KIA.state.canvas.getProp('projectFonts');
	const missingFonts = new Set();
	const layers = KIA.state.layers.getProp('map');
	for(let k in layers) {
		const layerFont = layers[k].css['font-family'];
		if(layerFont && !availableFonts[layerFont]) missingFonts.add(layerFont);
	}
	if(missingFonts.size) return true;
	return false;
}

function normalizeAssets(assets) {
	const stateAssetObj = {};
	const dbAssetObj = {};

	for (let [aKey, aObj] of Object.entries(assets)) {
	  const { blob, ...rest } = aObj;

	  stateAssetObj[aKey] = {
	    ...rest,
	    url: URL.createObjectURL(blob)
	  };

	  dbAssetObj[aKey] = {
	    ...rest,
	    blob
	  };
	}

	return {stateAssetObj, dbAssetObj};
}

function Index(data) {
	const normAssets = normalizeAssets(data.assets);

	KIA.state.canvas.addNewPagesKey(data.canvas.children);
	KIA.state.assets.importAssets(normAssets.stateAssetObj);
	KIA.state.pages.importPages(data.pages);
	KIA.state.layers.importLayers(data.layers);
	if(isMissingFont()) KIA.state.ui.setOpenModal('kiaMissingFontsModal');
    const canvasChildren = KIA.state.canvas.getProp('children');

	// KIA.services.idb.core.addObject('assets', Object.values(normAssets.dbAssetObj));
	// KIA.services.idb.core.addObject('pages', Object.values(data.pages));
	// KIA.services.idb.core.addObject('layers', Object.values(data.layers));
	// KIA.services.idb.core.updateKeyValueObject('canvas', { children: canvasChildren });
    KIA.state.ui.setActiveTool('triangle');
}

export default Index; 