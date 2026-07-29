
function Index() {

	const ids = KIA.state.canvas.getProp('children');
	
	ids.forEach((id)=>{
		const pageEl = KIA.kiaPages._qs(`[data-page="${id}"]`);
		if(!pageEl) {			
			const pageObj = KIA.nodesMap[id];
			if(!pageObj) return;
			const pageItemTemplate = KIA.kiaPages.$id.pageItemTemplate.content.cloneNode(true);
			const pageItemEl = pageItemTemplate.querySelector('.page-item');
			const pageNameEl = pageItemTemplate.querySelector('.page-name');
			const pageVisibleEl = pageItemTemplate.querySelector('.page-visible');
			const pageLockEl = pageItemTemplate.querySelector('.page-lock');

			pageItemEl.dataset.page = id;			
			pageNameEl.textContent = pageObj.title;
			pageVisibleEl.dataset.visibility = pageObj.style.visibility || 'inherit';
			pageLockEl.dataset.lock = pageObj.style['pointer-events'] || 'inherit';

			KIA.kiaPages.$id.pageItems.appendChild(pageItemTemplate);
		}
	});

	ids.forEach(id => {
        const el = KIA.kiaPages._qs(`[data-page="${id}"]`);
        if (el) KIA.kiaPages.$id.pageItems.appendChild(el);
    });
}

export default Index;