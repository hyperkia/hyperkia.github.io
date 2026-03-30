
const prop = 'stroke-dasharray';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(!layerObj.scss) return;
		if(layerObj.scss[prop]) {
			result[prop] = layerObj.scss[prop];
		}

		if(!layerObj.scss[prop] || layerObj.scss[prop].trim() === 'none') result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;	
		result.scss[prop] = inputCss[prop];
		if(!inputCss[prop]) result.scss[prop] = 'none';
	}
}

export default Index;