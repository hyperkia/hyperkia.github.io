
const prop = 'text-align';

function Index(source, result) {

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;	
		result.css[prop] = inputCss[prop];
	}
}

export default Index;