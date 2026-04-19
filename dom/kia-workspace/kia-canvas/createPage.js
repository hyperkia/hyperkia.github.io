
function Index() {

	const ids = KIA.state.canvas.getProp('children');
	let css = [];
	ids.forEach((id)=>{
		const pageEl = KIA.kiaCanvas._qs(`[data-page="${id}"]`);
		if(!pageEl) {
			const pageObj = KIA.nodesMap[id];
			if(!pageObj) return;
			const pageItemTemplate = KIA.kiaCanvas.$id.pageItemTemplate.content.cloneNode(true);
			const pageItemEl = pageItemTemplate.querySelector('.page');			

			pageItemEl.dataset.page = id;
			pageItemEl.dataset.lock = pageObj.style['pointer-events'];

			css.push(`[data-page="${id}"]{${KIA.utils.css.objectToCss(pageObj.style)}}`);
			KIA.canvasRefMap[id] = pageItemEl;
			KIA.kiaCanvas.$id.pages.appendChild(pageItemTemplate);

			KIA.kiaCanvas.$id['page'+id] = pageItemEl;			
		}
	})

	KIA.kiaCanvas.$id.style.innerHTML += css.join('');
}

export default Index;