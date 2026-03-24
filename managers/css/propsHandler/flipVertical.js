function Index(css, source) {
	if(source === 'propsInputToSelection') {
		const key = KIA.dom.read.getSelectionKey();
		const lCss = KIA.state.layers.map[key].css;
		
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

		delete css['flip-vertical'];
		css.scale = `${scaleX} ${scaleY}`;
	}

}

export default Index;