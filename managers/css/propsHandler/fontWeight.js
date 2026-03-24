function Index(css, source) {
	if(source === 'propsInputToSelection') {
		const value = css['font-weight'];
		if(value.includes('-italic')) {
			css['font-weight'] = value.split('-')[0];
			css['font-style'] = 'italic';
		} else {
			css['font-style'] = 'normal';
		}
	}
}

export default Index;