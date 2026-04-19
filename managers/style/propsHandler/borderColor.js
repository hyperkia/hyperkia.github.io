
let prop = 'border-color';

function Index(source, result) {
		
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.instanceof === 'svg') result['border-color'] = layerObj.attributes.stroke;
		if(layerObj.instanceof === 'html') result['border-color'] = layerObj.style['border-color'];
		if(!result['border-color']) result['border-color'] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		if(!inputStyle['border-color']) return;
		if(layerObj.instanceof === 'svg') result.attributes.stroke = inputStyle['border-color'];
		if(layerObj.instanceof === 'html') result.style['border-color'] = inputStyle['border-color'];	
	}


}

export default Index;