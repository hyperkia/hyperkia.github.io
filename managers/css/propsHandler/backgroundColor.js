
let prop = 'background-color';

function Index(source, result) {
	
	const layerElement = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerElement instanceof SVGElement) result['background-color'] = layerObj.scss.fill;
		if(layerElement instanceof HTMLElement) result['background-color'] = layerObj.css['background-color'];
		if(!result['background-color']) result['background-color'] = '';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		if(!inputCss['background-color']) return;
		if(layerElement instanceof SVGElement) result.scss.fill = inputCss['background-color'];
		if(layerElement instanceof HTMLElement) result.css['background-color'] = inputCss['background-color'];	
	}

}

export default Index;