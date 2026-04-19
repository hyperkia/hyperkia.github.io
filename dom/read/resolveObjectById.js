function Index(id){
	return KIA.state.layers.getProp('map')[id] || KIA.state.pages.getProp('map')[id] || null;
}

export default Index;