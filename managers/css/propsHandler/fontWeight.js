

const prop = 'font-weight';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'SelectionToPropsInput') {
		if(layerObj.css[prop]) result[prop] = layerObj.css[prop];
		if(!layerObj.css[prop]) result[prop] = '400';
	}

	if(source === 'propsInputToSelection') {
		const inputCss = result.inputCss;
		const value = inputCss['font-weight'];
		if(value.includes('-italic')) {
			result.css['font-weight'] = value.split('-')[0];
			result.css['font-style'] = 'italic';
		} else {
			result.css['font-style'] = 'normal';
			result.css['font-weight'] = value;
		}
	}

}

export default Index;