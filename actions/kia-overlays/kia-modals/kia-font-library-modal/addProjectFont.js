function Index(fonts) {	
	console.log(fonts);
	KIA.state.canvas.addFont(fonts);
	KIA.services.idb.core.updateKeyValueObject('canvas', {
		projectFonts: KIA.state.canvas.getProp('projectFonts'),
	})	
}

export default Index; 