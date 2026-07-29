function Index(){
	let layersPages = KIA.kiaLayers._qsAll('.page-node');
	let canvasPages = KIA.kiaCanvas.$id.pages.children;
	layersPages = [...layersPages];
	canvasPages = [...canvasPages];

	canvasPages.forEach((canvasPage, i) => {
		if(canvasPage.dataset.page !== layersPages[i].dataset.item) {
			console.log('Page Order Not Match');
			console.error('Page Order Not Match');
			console.warn('Page Order Not Match');
		}
	})
}

export default Index;