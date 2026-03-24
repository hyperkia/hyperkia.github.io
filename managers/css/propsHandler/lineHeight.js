function Index(css, source) {

	if(source === 'SelectionToPropsInput') {
		if(css['line-height']) css['line-height'] = parseInt(css['line-height']);
		if(!css['line-height']) css['line-height'] = '';
	} 


}

export default Index;