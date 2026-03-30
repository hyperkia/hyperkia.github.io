
const prop = 'border-width';
const sides = ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'];

function Index(source, result) {

	const layerElement = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {

		if(layerElement instanceof HTMLElement) { 
			if(layerObj.css[prop]) result[prop] = parseInt(layerObj.css[prop]);
			if(!layerObj.css[prop]) result[prop] = '';
			const isAllSame = sides.every(s=>layerObj.css[s]===layerObj.css[sides[0]]);
			if(isAllSame) result[prop] = parseInt(layerObj.css[sides[0]]);
		} 

		if(layerElement instanceof SVGElement) {
			if(layerObj.scss['stroke-width']) result[prop] = parseInt(layerObj.scss['stroke-width']);
			if(!layerObj.scss['stroke-width']) result[prop] = '';			
		}

	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		let value = inputCss[prop];
		if(value === 'px' || value === '0px') value = '0px';
		
		if(layerElement instanceof HTMLElement) {
			result.css['border-width'] = value;
			result.css['border-top-width'] = value;
			result.css['border-right-width'] = value;
			result.css['border-bottom-width'] = value;
			result.css['border-left-width'] = value;
		}
		if(layerElement instanceof SVGElement) {
			result.scss['stroke-width'] = value;
		}
	}

}

export default Index;



