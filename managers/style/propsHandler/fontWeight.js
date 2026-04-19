

const prop = 'font-weight';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.style[prop]) result[prop] = layerObj.style[prop];
		if(!layerObj.style[prop]) result[prop] = '400';
	}

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		const value = inputStyle['font-weight'];
		if(value.includes('-italic')) {
			result.style['font-weight'] = value.split('-')[0];
			result.style['font-style'] = 'italic';
		} else {
			result.style['font-style'] = 'normal';
			result.style['font-weight'] = value;
		}
	}

}

export default Index;