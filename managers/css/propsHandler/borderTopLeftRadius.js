
const prop = 'border-top-left-radius';

function Index(css, source) {

	if(source === 'SelectionToPropsInput') {
		if(css[prop] || css['border-radius']) {
			css[prop] = parseInt(css[prop]) || parseInt(css['border-radius']);
		}

		if(!css[prop]) css[prop] = '';
	}

}

export default Index;