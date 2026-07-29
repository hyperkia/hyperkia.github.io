const Index = {
	getClosestContextMenuTarget(el){
		const id =  el.closest('[data-layer]')?.dataset.layer || el.closest('[data-item]')?.dataset.item || el.closest('[data-page]')?.dataset.page || 'canvas';
		let type = 'canvas';
		const parentObjectStore = KIA.dom.read.getObjectStoreNameById(id);

		if(parentObjectStore === 'layers') type = 'layer';
		if(parentObjectStore === 'pages') type = 'page';
		return { id, type }
	},
};

export default Index;