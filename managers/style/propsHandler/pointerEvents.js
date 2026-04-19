
const prop = 'pointer-events';

function Index(source, result) {

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;	
		result.style[prop] = inputStyle[prop];
	}
}

export default Index;