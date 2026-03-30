
const prop = 'letter-spacing';

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
		if(inputCss[prop] === 'px') result.css[prop] = '0px';
	}
}

export default Index;