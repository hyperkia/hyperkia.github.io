
const prop = 'border-radius';
const sides = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.style[prop]) result[prop] = parseInt(layerObj.style[prop]);
		if(!layerObj.style[prop]) result[prop] = '';

		const isAllSame = sides.every(s=>layerObj.style[s]===layerObj.style[sides[0]]);
		if(isAllSame) result[prop] = parseInt(layerObj.style[sides[0]]);
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		let value = inputStyle[prop];
		if(value === 'px' || value === '0px') value = '0px'
		result.style[prop] = value;		
		sides.forEach(s => result.style[s]=value);
	}

}

export default Index;



