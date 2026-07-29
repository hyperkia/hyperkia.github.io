
const Methods = {
	activeSelectionInUI(){
		const id = KIA.state.ui.getSelectionId();
		KIA.kiaPages._qs('.page-item.active')?.classList.remove('active');
		const activePageEl = KIA.kiaPages._qs(`[data-page="${id}"]`);
		activePageEl?.classList.add('active');

		if(!activePageEl) return;
		const activePageElRect = activePageEl.getBoundingClientRect();
		const pagesRect = KIA.kiaPages.getBoundingClientRect();
		if(activePageElRect.top < pagesRect.top || activePageElRect.top > pagesRect.top+pagesRect.height) activePageEl.scrollIntoView();
	}
};

export default Methods;