function Index(css, source) {

	if(source === 'SelectionToPropsInput') {
		if(css['font-size']) css['font-size'] = parseInt(css['font-size']);
	}

	if(!css['font-size']) css['font-size'] = '';

}

export default Index;