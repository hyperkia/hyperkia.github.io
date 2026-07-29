
function Index() {

	const ids = KIA.state.canvas.getProp('children');
	let style = [];
	ids.forEach((id,i)=>{
		const pageEl = KIA.kiaCanvas._qs(`[data-page="${id}"]`);
		if(!pageEl) {
			const pageObj = KIA.nodesMap[id];
			if(!pageObj) return;
			const pageItemTemplate = KIA.kiaCanvas.$id.pageItemTemplate.content.cloneNode(true);
			const pageItemEl = pageItemTemplate.querySelector('.page');			

			pageItemEl.dataset.page = id;

			style.push(`[data-page="${id}"]{${KIA.utils.css.objectToCss(pageObj.style)}}`);
			KIA.canvasRefMap[id] = pageItemEl;
			KIA.kiaCanvas.$id.pages.appendChild(pageItemTemplate);
		}
	});

	ids.forEach(id => {
        const el = KIA.canvasRefMap[id];
        if (el) KIA.kiaCanvas.$id.pages.appendChild(el);
    });

	KIA.kiaCanvas.$id.style.innerHTML += style.join('');
}

export default Index;