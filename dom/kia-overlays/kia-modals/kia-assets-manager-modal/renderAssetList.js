function Index(){
	const assets = KIA.state.assets.getAssets();
	const itemsEl = KIA.kiaAssetsManagerModal?.$id.medialibraryItems;

	if(!itemsEl) return;
	if(itemsEl.offsetWidth === 0) return;

	const assetsIds = Object.keys(assets);
	let start = itemsEl.childElementCount;
	const end = start + 80;	

	let html = '';
	for(start; start<end; start++) {
		const id = assetsIds[start];
		if(!id) break;
		const a = assets[id];
		html += `
			<div class="medialibrary-item" title="${a.name}" data-asset="${id}">
				<img src="${a.url}" alt="${a.name}">
			</div>
		`;
	}

	if(html) itemsEl.insertAdjacentHTML('beforeend', html);

	const displayLoadMore = start === assetsIds.length ? 'none' : 'inline-block';
	KIA.kiaAssetsManagerModal.$id.loadMoreAssets.style.display = displayLoadMore;
}

export default Index;