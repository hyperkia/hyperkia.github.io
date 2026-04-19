
const prop = 'color';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.style[prop]) result[prop] = layerObj.style[prop];
		if(!result[prop]) result[prop] = '';
		if(result[prop] === 'transparent') result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		result.style[prop] = inputStyle[prop];
	}

}

export default Index;



