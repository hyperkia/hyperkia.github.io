
const prop = 'rotate';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.css[prop]) {
			result[prop] = parseInt(layerObj.css[prop]);
		}

		if(!layerObj.css[prop]) result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;	
		result.css[prop] = inputCss[prop];
		if(inputCss[prop] === 'deg') result.css[prop] = '0deg';
	}
}

export default Index;