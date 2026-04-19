function Index(id){
	return KIA.kiaLayers._qs(`[data-item="${id}"]`) || null;
}

export default Index;