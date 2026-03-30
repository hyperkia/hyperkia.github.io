function Index(){
	const assets = KIA.state.assets.map;
	const itemsEl = KIA.kiaAssetsManagerModal?.$id.medialibraryItems;

	if(!itemsEl) return;
	if(itemsEl.offsetWidth === 0) return;

	const assetsLength = Object.keys(assets).length;
	const assetsRenderedLength = itemsEl.childElementCount;

	if(assetsRenderedLength === assetsLength) return;
	if(assetsRenderedLength > 100) return;

	let html = '';
	let i = 0;
	for(let k in assets) {
		if(i>100) break;
		const a = assets[k];
		html += `
			<div class="medialibrary-item" title="${a.name}" data-asset="${k}">
				<img src="${a.url}" alt="${a.name}">
			</div>
		`;
		i++;
	}
	itemsEl.innerHTML = html;
}

export default Index;