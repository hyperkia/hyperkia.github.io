
let prop = 'border-color';

function Index(source, result) {
		
	const layerElement = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerElement instanceof SVGElement) result['border-color'] = layerObj.scss.stroke;
		if(layerElement instanceof HTMLElement) result['border-color'] = layerObj.css['border-color'];
		if(!result['border-color']) result['border-color'] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		if(!inputCss['border-color']) return;
		if(layerElement instanceof SVGElement) result.scss.stroke = inputCss['border-color'];
		if(layerElement instanceof HTMLElement) result.css['border-color'] = inputCss['border-color'];	
	}


}

export default Index;