
const prop = 'font-family';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.style[prop]) result[prop] = layerObj.style[prop];
		if(!layerObj.style[prop]) result[prop] = 'Select';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		result.style[prop] = inputStyle[prop];
	}

}

export default Index;



