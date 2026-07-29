
function Index() {

	const ids = Object.keys(KIA.state.pages.getPages());
	ids.forEach((id)=>{
		const pageNameEl = KIA.kiaCanvas._qs(`[data-page-name="${id}"]`);
		if(!pageNameEl) {
			const pageObj = KIA.nodesMap[id];
			const pageNameTemplate = KIA.kiaCanvas.$id.pageNameTemplate.content.cloneNode(true);
			const pageNameEl = pageNameTemplate.querySelector('.page-name');			

			pageNameEl.dataset.pageName = id;
			pageNameEl.innerText = pageObj.title;
			pageNameEl.style.visibility = pageObj.style.visibility;

			KIA.kiaCanvas.$id.pageNames.appendChild(pageNameTemplate);

			KIA.kiaCanvas.$id['pageName'+id] = pageNameEl;
		}
	});

	ids.forEach(id => {
        const el = KIA.kiaCanvas._qs(`[data-page-name="${id}"]`);
        if (el) KIA.kiaCanvas.$id.pageNames.appendChild(el);
    });

}

export default Index;