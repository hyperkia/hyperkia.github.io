function Index(){
	const pages = KIA.state.pages.map;
	const layers = KIA.state.layers.map;


	for(let pk in pages) {
		const fragments = document.createDocumentFragment();

		const pageEl = KIA.kiaLayers._qs(`[data-page="${pk}"].page-item.show`);
		if(!pageEl) continue;

		const pageLayers = pages[pk].layers;
		pageLayers.forEach((lk)=>{			
			const l = layers[lk];			
			const itemTemplate = KIA.kiaLayers.$id.layerItemTemplate.content.cloneNode(true);
		    const layerItemEl = itemTemplate.querySelector('.layer-item');
		    layerItemEl.dataset.layer = lk;
		    const layerNameEl = itemTemplate.querySelector('.layer-name');
		    layerNameEl.innerText = l.nodeName;
		    const layerVisibleEl = itemTemplate.querySelector('.layer-visible');
		    layerVisibleEl.dataset.visiblity = l.css.visibility;
		    const layerLockEl = itemTemplate.querySelector('.layer-lock');
		    layerLockEl.dataset.lock = l.css['pointer-events'];
		    fragments.appendChild(itemTemplate);	   
		});
		
		KIA.kiaLayers._qs(`[data-layers-page="${pk}"]`)?.remove();
		const layersWrapperEl = document.createElement('div');
		layersWrapperEl.classList.add('page-layers');
		layersWrapperEl.dataset.layersPage = pk;
		layersWrapperEl.appendChild(fragments);
		pageEl.insertAdjacentElement('afterend',layersWrapperEl);
	}

	
}

export default Index;