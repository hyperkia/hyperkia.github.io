
function Index(source, result) {
	if(source === 'propsInputToSelection') {
		const id = KIA.state.ui.getSelectionId();
		const lCss = KIA.state.layers.map[id].css;
		
		let scale = lCss.scale;
		let scaleX = '';
		let scaleY = '';

		if(scale) {
			[scaleX, scaleY] = scale.split(' ');
			scaleY = -(scaleY);
		} else {
			scaleX = 1;	
			scaleY = -1;	
		}

		result.style.scale = `${scaleX} ${scaleY}`;
	}

}

export default Index;