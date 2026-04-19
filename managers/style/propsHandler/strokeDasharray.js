
const prop = 'stroke-dasharray';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(!layerObj.attributes) return;
		if(layerObj.attributes[prop]) {
			result[prop] = layerObj.attributes[prop];
		}

		if(!layerObj.attributes[prop] || layerObj.attributes[prop].trim() === 'none') result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;	
		result.attributes[prop] = inputStyle[prop];
		if(!inputStyle[prop]) result.attributes[prop] = 'none';
	}
}

export default Index;