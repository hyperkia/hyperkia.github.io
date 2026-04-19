
const prop = 'overflow';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		result[prop] = false;
		if(layerObj.style[prop] === 'hidden') result[prop] = true;
		if(layerObj.style[prop] === 'visible') result[prop] = false;
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		if(inputStyle.overflow) result.style[prop] = 'hidden';
		if(!inputStyle.overflow) result.style[prop] = 'visible';
	}

}

export default Index;



