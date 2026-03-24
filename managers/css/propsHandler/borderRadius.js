
const prop = 'border-radius';

function Index(css, source) {

	if(source === 'SelectionToPropsInput') {
		if(css[prop]) css[prop] = parseInt(css[prop]);
		if(!css[prop]) css[prop] = '';
	}

}

export default Index;