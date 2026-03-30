
const prop = 'opacity';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.css[prop]) {
			result[prop] = (layerObj.css[prop]*100).toFixed(0);			
		}

		if(!layerObj.css[prop]) result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;	
		result.css[prop] = (inputCss[prop]/100).toFixed(2)
		if(inputCss[prop] === '') result.css[prop] = 1;
	}
}

export default Index;