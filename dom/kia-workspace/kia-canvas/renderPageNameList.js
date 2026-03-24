
function Index() {

	const keys = Object.keys(KIA.state.pages.map);
	keys.forEach((k)=>{
		const pageNameEl = KIA.kiaCanvas._qs(`[data-page-name="${k}"]`);
		if(!pageNameEl) {
			const pageObj = KIA.state.pages.map[k];
			const pageNameTemplate = KIA.kiaCanvas.$id.pageNameTemplate.content.cloneNode(true);
			const pageNameEl = pageNameTemplate.querySelector('.page-name');			

			pageNameEl.dataset.pageName = k;
			pageNameEl.innerText = pageObj.name;

			KIA.kiaCanvas.$id.pageNames.appendChild(pageNameTemplate);

			KIA.kiaCanvas.$id['pageName'+k] = pageNameEl;
		}
	})

}

export default Index;