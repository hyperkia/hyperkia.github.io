
const prop = 'rotate';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.style[prop]) {
			result[prop] = parseInt(layerObj.style[prop]);
		}

		if(!layerObj.style[prop]) result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;	
		result.style[prop] = inputStyle[prop];
		if(inputStyle[prop] === 'deg') result.style[prop] = '0deg';
	}
}

export default Index;