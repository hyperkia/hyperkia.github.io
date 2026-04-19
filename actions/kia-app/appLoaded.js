
function createDefaultPage() {
	const pageObject = {
	    id: crypto.randomUUID(),
	    title: 'Page 1',
	    style: {
	        'background-color': '#ffffffff',
	        width: '1920px',
	        height: '6000px',
	        'pointer-events': 'auto',
	        visibility: 'visible',
	    },
	    children: [],
	    instanceof: 'document',
	}

	KIA.actions.kiaPages.createPage(pageObject);
}

function Index() {
	KIA.kiaApp.dispatchEvent(new CustomEvent('appLoaded', {
	  bubbles: true,
	  composed: true,
	  detail: { source: this.cryptoId}
	})); 
	KIA.actions.kiaCanvas.canvasScaleOnLoad();		
	KIA.services.idb.core.initDatabase().then((response)=>{
		KIA.state.assets.loadData(KIA.managers.assets(response.assets));
		KIA.state.canvas.loadData(response.canvas);
		KIA.state.pages.loadPages(response.pages);
		KIA.state.layers.loadLayers(response.layers);
		if(Object.keys(response.pages).length === 0) createDefaultPage();
	});
} 

export default Index;