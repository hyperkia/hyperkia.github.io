
const prop = 'background-color';

function Index(css, source) {

	if(source === 'SelectionToPropsInput') {
		if(!css[prop]) css[prop] = '';
	} else if (source === 'propsInputToSelection') {
		const l = KIA.dom.read.getSelectionLayerElement();
		if(l instanceof SVGElement) {
			css.fill = css['background-color'];
			delete css['background-color'];
		}
	}
}

export default Index;