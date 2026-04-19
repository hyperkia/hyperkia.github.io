function Index(id){
	return KIA.kiaCanvas._qs(`[data-layer="${id}"]`) || KIA.kiaCanvas._qs(`[data-page="${id}"]`) || null;
}

export default Index;