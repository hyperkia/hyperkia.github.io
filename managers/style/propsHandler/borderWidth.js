
const prop = 'border-width';
const sides = ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'];

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {

		if(layerObj.instanceof === 'html') { 
			if(layerObj.style[prop]) result[prop] = parseInt(layerObj.style[prop]);
			if(!layerObj.style[prop]) result[prop] = '';
			const isAllSame = sides.every(s=>layerObj.style[s]===layerObj.style[sides[0]]);
			if(isAllSame) result[prop] = parseInt(layerObj.style[sides[0]]);
		} 

		if(layerObj.instanceof === 'svg') {
			if(layerObj.attributes['stroke-width']) result[prop] = parseInt(layerObj.attributes['stroke-width']);
			if(!layerObj.attributes['stroke-width']) result[prop] = '';			
		}

	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		let value = inputStyle[prop];
		if(value === 'px' || value === '0px') value = '0px';
		
		if(layerObj.instanceof === 'html') {
			result.style['border-width'] = value;
			result.style['border-top-width'] = value;
			result.style['border-right-width'] = value;
			result.style['border-bottom-width'] = value;
			result.style['border-left-width'] = value;
		}
		if(layerObj.instanceof === 'svg') {
			result.attributes['stroke-width'] = value;
		}
	}

}

export default Index;



