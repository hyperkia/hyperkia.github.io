
let prop = 'background-color';

function Index(source, result) {
		
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.instanceof === 'svg') result['background-color'] = layerObj.attributes.fill;
		if(layerObj.instanceof === 'html') result['background-color'] = layerObj.style['background-color'];
		if(!result['background-color']) result['background-color'] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		if(!inputStyle['background-color']) return;
		if(layerObj.instanceof === 'svg') result.attributes.fill = inputStyle['background-color'];
		if(layerObj.instanceof === 'html') result.style['background-color'] = inputStyle['background-color'];
	}

}

export default Index;