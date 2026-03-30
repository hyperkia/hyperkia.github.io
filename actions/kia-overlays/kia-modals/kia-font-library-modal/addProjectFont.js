function Index(fonts) {	
	KIA.state.canvas.addFont(fonts);
	KIA.services.idb.core.updateKeyValueObject('canvas', {
		projectFonts: KIA.state.canvas.projectFonts,
	})	
}

export default Index; 