function Index() {
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	if(!layerObj) return;
	
	let attrsString = '';
	for(let [k,s] of Object.entries(layerObj.stack)) {		
		if(s.type === 'filter') {
			if(s.trash === true) continue; 
			attrsString += `--${s.name}`;
			const inputEl = KIA.kiaCssFilter._qs(`[data-prop="filter-${s.name}"]`);
			inputEl.value = parseInt(s.value);
			inputEl.dataset.stack = s.key;
			KIA.kiaCssFilter._qs(`[data-filter="${s.name}"] .filter-visible`).dataset.filterVisible = s.status;
		}
	}
	
	KIA.kiaCssFilter.$id.filterItemsRow.dataset.activeFilters = attrsString;
}

export default Index;