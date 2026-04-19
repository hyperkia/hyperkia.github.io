const Index = {
	getClosestContextMenuTarget(el){
		const id =  el.closest('[data-layer]')?.dataset.layer || el.closest('[data-item]')?.dataset.item || el.closest('[data-page]')?.dataset.page || 'canvas';
		let type = 'canvas';
		if(KIA.state.layers.getProp('map')[id]) type = 'layer';
		if(KIA.state.pages.getProp('map')[id]) type = 'page';
		return { id, type }
	},
};

export default Index;