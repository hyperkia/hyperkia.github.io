
const prop = 'opacity';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.style[prop]) {
			result[prop] = (layerObj.style[prop]*100).toFixed(0);			
		}

		if(!layerObj.style[prop]) result[prop] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;	
		result.style[prop] = (inputStyle[prop]/100).toFixed(2)
		if(inputStyle[prop] === '') result.style[prop] = 1;
	}
}

export default Index;