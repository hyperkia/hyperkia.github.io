function Index() {
	const dirtyPage = KIA.state.ui.getProp('dirtyMap').page;
	if(dirtyPage.flag !== 'deletePage') return;

	KIA.kiaLayers.$id.layers.appendChild(KIA.kiaLayers.$id.itemContent);

	KIA.layersRefMap[dirtyPage.id].querySelectorAll('*').forEach( (el) => {
		const elId = el.dataset.item;
		if(elId) KIA.layersRefMap[elId] = null;
		el.remove();
	});
	KIA.layersRefMap[dirtyPage.id].remove();
	KIA.layersRefMap[dirtyPage.id] = null;
	delete KIA.layersRefMap[dirtyPage.id];

}

export default Index;