
function Index() {

	const keys = Object.keys(KIA.state.pages.getProp('map'));
	keys.forEach((id)=>{
		const pageNameEl = KIA.kiaCanvas._qs(`[data-page-name="${id}"]`);
		if(!pageNameEl) {
			const pageObj = KIA.nodesMap[id];
			const pageNameTemplate = KIA.kiaCanvas.$id.pageNameTemplate.content.cloneNode(true);
			const pageNameEl = pageNameTemplate.querySelector('.page-name');			

			pageNameEl.dataset.pageName = id;
			pageNameEl.innerText = pageObj.title;

			KIA.kiaCanvas.$id.pageNames.appendChild(pageNameTemplate);

			KIA.kiaCanvas.$id['pageName'+id] = pageNameEl;
		}
	})

}

export default Index;