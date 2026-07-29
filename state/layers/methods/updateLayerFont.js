

function Index(newLayersObj){
	for(let [lId, lObj] of Object.entries(newLayersObj)) {
		Object.assign(KIA.nodesMap[lId].style, newLayersObj[lId].style);
	}
	KIA.observer.layers.observe('renderLayersMissFonts');
}

export default Index;