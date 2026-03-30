
function Index() {

	const keys = KIA.state.canvas.pagesOrder;
	keys.forEach((k)=>{
		const pageEl = KIA.kiaPages._qs(`[data-page="${k}"]`);
		if(!pageEl) {
			const pageObj = KIA.state.pages.map[k];
			if(!pageObj) return;
			const pageItemTemplate = KIA.kiaPages.$id.pageItemTemplate.content.cloneNode(true);
			const pageItemEl = pageItemTemplate.querySelector('.page-item');
			const pageNameEl = pageItemTemplate.querySelector('.page-name');
			const pageVisibleEl = pageItemTemplate.querySelector('.page-visible');
			const pageLockEl = pageItemTemplate.querySelector('.page-lock');

			pageItemEl.dataset.page = k;			
			pageNameEl.innerText = pageObj.name;
			pageVisibleEl.dataset.visiblity = pageObj.css.visibility;
			pageLockEl.dataset.lock = pageObj.css['pointer-events'];

			KIA.kiaPages.$id.pageItems.appendChild(pageItemTemplate);
		}
	})
}

export default Index;