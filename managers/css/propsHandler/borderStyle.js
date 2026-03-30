
const prop = 'border-style';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.css[prop]) result[prop] = layerObj.css[prop];
		if(!layerObj.css[prop]) result[prop] = 'none';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		result.css[prop] = inputCss[prop];
	}

}

export default Index;



