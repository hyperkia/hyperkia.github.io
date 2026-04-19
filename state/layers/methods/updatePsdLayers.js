function Index(newLayersObj){
	for(let [lKey, lObj] of Object.entries(newLayersObj)) {
		Object.assign(this.map[lKey].css, newLayersObj[lKey].css);
	}
	KIA.observer.layers.observe('renderPsdLayers');
}

export default Index;