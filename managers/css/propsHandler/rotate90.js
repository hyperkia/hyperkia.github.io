function Index(css, source) {

	if(source === 'propsInputToSelection') {
		const key = KIA.dom.read.getSelectionKey();
		const lCss = KIA.state.layers.map[key].css;
		let rotate = parseInt(lCss['rotate'])||0;
		rotate = rotate>=360 ? 360-rotate : rotate;
		css['rotate'] = rotate + 90 + 'deg';
		delete css.rotate90;
	}


}

export default Index;