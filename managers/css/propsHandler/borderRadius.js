
const prop = 'border-radius';
const sides = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.css[prop]) result[prop] = parseInt(layerObj.css[prop]);
		if(!layerObj.css[prop]) result[prop] = '';

		const isAllSame = sides.every(s=>layerObj.css[s]===layerObj.css[sides[0]]);
		if(isAllSame) result[prop] = parseInt(layerObj.css[sides[0]]);
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		let value = inputCss[prop];
		if(value === 'px' || value === '0px') value = '0px'
		result.css[prop] = value;		
		sides.forEach(s => result.css[s]=value);
	}

}

export default Index;



