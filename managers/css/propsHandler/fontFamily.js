
const prop = 'font-family';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.css[prop]) result[prop] = layerObj.css[prop];
		if(!layerObj.css[prop]) result[prop] = 'Select';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		result.css[prop] = inputCss[prop];
	}

}

export default Index;



