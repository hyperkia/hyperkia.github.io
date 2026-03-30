
function Index() {

	const keys = KIA.state.canvas.pagesOrder;
	let css = [];
	keys.forEach((k)=>{
		const pageEl = KIA.kiaCanvas._qs(`[data-page="${k}"]`);
		if(!pageEl) {
			const pageObj = KIA.state.pages.map[k];
			if(!pageObj) return;
			const pageItemTemplate = KIA.kiaCanvas.$id.pageItemTemplate.content.cloneNode(true);
			const pageItemEl = pageItemTemplate.querySelector('.page');			

			pageItemEl.dataset.page = k;			
			pageItemEl.dataset.lock = pageObj.css['pointer-events'];

			css.push(`[data-page="${k}"]{${KIA.utils.css.objectToCss(pageObj.css)}}`);
			KIA.kiaCanvas.$id.pages.appendChild(pageItemTemplate);

			KIA.kiaCanvas.$id['page'+k] = pageItemEl;
			const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	        svgEl.classList.add('page-svg');
	        KIA.kiaCanvas.$id['pageSvg'+k] = svgEl;
	        pageItemEl.appendChild(svgEl);
		}
	})

	KIA.kiaCanvas.$id.style.innerHTML += css.join('');
}

export default Index;