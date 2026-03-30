

function isMissingFont(){
	const availableFonts = KIA.state.canvas.projectFonts;
	const missingFonts = new Set();
	const layers = KIA.state.layers.map;
	for(let k in layers) {
		const layerFont = layers[k].css['font-family'];
		if(!availableFonts[layerFont] && layerFont) missingFonts.add(layerFont);
	}
	if(missingFonts.size) return true;
	return false;
}

function Index(data) {
	KIA.state.canvas.addNewPagesKey(data.canvas.pagesOrder);
	KIA.state.pages.importPages(data.pages);
	KIA.state.layers.importLayers(data.layers);
	if(isMissingFont()) KIA.state.ui.setOpenModal('kiaMissingFontsModal');
    const pagesOrder = KIA.state.canvas.pagesOrder;

	KIA.services.idb.core.addObject('assets', Object.values(data.assets));
	KIA.services.idb.core.addObject('pages', Object.values(data.pages));
	KIA.services.idb.core.addObject('layers', Object.values(data.layers));
	KIA.services.idb.core.updateKeyValueObject('canvas', { pagesOrder })
    KIA.state.ui.setActiveTool('triangle');
}

export default Index; 