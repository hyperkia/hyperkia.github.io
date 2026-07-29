

function Index(layers){
	Object.assign(KIA.nodesMap, layers);
	KIA.observer.layers.observe('loadLayers');
}

export default Index;