

function normalizeAssets(assets) {
	const stateAssetObj = {};
	const dbAssetObj = {};

	for (let [aId, aObj] of Object.entries(assets)) {
	  const { blob, ...rest } = aObj;

	  stateAssetObj[aId] = {
	    ...rest,
	    url: URL.createObjectURL(blob)
	  };

	  dbAssetObj[aId] = {
	    ...rest,
	    blob
	  };
	}

	return {stateAssetObj, dbAssetObj};
}

function Index(data) {
	if(!data) return;
	const normAssets = normalizeAssets(data.assets);
	KIA.state.canvas.addFont(data.canvas.projectFonts);
	KIA.state.canvas.addImportPagesIdAsChildren(data.canvas.children);
	KIA.state.assets.importAssets(normAssets.stateAssetObj);
	KIA.state.pages.importPages(data.pages);
	KIA.state.layers.importLayers(data.layers);	
	KIA.state.ui.setOpenModal('kiaMissingFontsModal');

    const updateCanvas = {
    	children: KIA.state.canvas.getProp('children'),
    	projectFonts: KIA.state.canvas.getProp('projectFonts'),
    }
	KIA.services.idb.core.addObject('assets', Object.values(normAssets.dbAssetObj));
	KIA.services.idb.core.addObject('pages', Object.values(data.pages));
	KIA.services.idb.core.addObject('layers', Object.values(data.layers));
	KIA.services.idb.core.updateKeyValueObject('canvas', updateCanvas);
	
	KIA.actions.share.resetSelectionId();
    KIA.state.ui.setActiveTool('triangle');
}

export default Index; 