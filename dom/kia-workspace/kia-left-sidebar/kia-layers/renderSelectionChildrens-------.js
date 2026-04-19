function Index(){
	const layers = KIA.state.layers.getProp('map');
	const parentId = KIA.state.ui.getSelectionId();
	const parentEl = KIA.kiaLayers._qs(`[data-item="${parentId}"]`);

	const children = KIA.dom.read.getSelectionObject().children;
	const fragments = document.createDocumentFragment();

	children.forEach((id)=>{
		const l = layers[id];
		if(!l) return;
		const itemTemplate = KIA.kiaLayers.$id.layerItemTemplate.content.cloneNode(true);
	    const itemEl = itemTemplate.querySelector('.parent');
	    itemEl.dataset.item = id;
	    itemEl.dataset.children = l.children.length;
	    const layerNameEl = itemTemplate.querySelector('.parent-title');
	    layerNameEl.textContent = l.title || l.nodeName.toLowerCase();
	    const itemVisibleEl = itemTemplate.querySelector('.item-visible');
	    itemVisibleEl.dataset.visiblity = l.style.visibility;
	    const itemLockEl = itemTemplate.querySelector('.item-lock');
	    itemLockEl.dataset.lock = l.style['pointer-events'];
	    fragments.appendChild(itemTemplate);
	});
	
	if(fragments.childElementCount === parentChildsEl.childElementCount) return;
	parentChildsEl.appendChild(fragments);
}

export default Index;