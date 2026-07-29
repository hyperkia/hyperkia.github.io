function Index(){
	const objectStoreLayers = KIA.services.idb.core.getAllObjects('layers');
	objectStoreLayers.then((layers)=>{
		for(let [lId, lObj] of Object.entries(layers)) {
			if(lObj.instanceof === 'document') {
				console.log('Page Object In Layers Object Store');
				console.error('Page Object In Layers Object Store');
				console.warn('Page Object In Layers Object Store');
			}
		}
	});


	const stateLayers = KIA.state.layers.getLayers();
	for(let [lId, lObj] of Object.entries(stateLayers)) {
		if(lObj.instanceof === 'document') {
			console.log('Page Object In Layers Object Store');
			console.error('Page Object In Layers Object Store');
			console.warn('Page Object In Layers Object Store');
		}
	}
}

export default Index;