
const prop = 'visibility';

function Index(source, result) {

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		result.style[prop] = inputStyle[prop];
	}
}

export default Index;