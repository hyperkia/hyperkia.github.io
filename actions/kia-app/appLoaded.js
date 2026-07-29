 
function createDefaultPage() {
	const pageObject = structuredClone(KIA.state.config.getProp('newPageObject'));
	pageObject.id = crypto.randomUUID();
	KIA.actions.kiaPages.createPage(pageObject);
}

function loadUserSettings(){
	const theme = localStorage.getItem('preference-theme');
	KIA.actions.kiaLeftHeader.switchTheme(theme);
}

function Index() {
	KIA.kiaApp.dispatchEvent(new CustomEvent('appLoaded', {
	  bubbles: true,
	  composed: true,
	})); 

	KIA.actions.kiaCanvas.canvasScaleOnLoad();
	loadUserSettings();
	KIA.services.idb.core.initDatabase().then((response)=>{		
		KIA.state.assets.loadAssets(KIA.managers.assets(response.assets));
		KIA.state.canvas.loadCanvas(response.canvas);
		KIA.state.pages.loadPages(response.pages);
		KIA.state.layers.loadLayers(response.layers);
		if(Object.keys(response.pages).length === 0) createDefaultPage();		

		KIA.kiaApp.dispatchEvent(new CustomEvent('appLoaded', {
		  bubbles: true,
		  composed: true,
		  detail: {}
		})); // double for canvas data

		KIA.managers.garbage();
	}).catch((err)=>{
		console.log(err);
	});
} 

export default Index;