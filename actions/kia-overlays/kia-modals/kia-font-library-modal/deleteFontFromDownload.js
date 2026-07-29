function Index(name) {
	KIA.state.canvas.deleteFont(name);
	KIA.services.idb.core.updateKeyValueObject('canvas', {
		projectFonts: KIA.state.canvas.getProp('projectFonts'),
	})	
}

export default Index;