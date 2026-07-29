
import propHandler from '../propsHandler/index.js';

function Index() {
	
	const id = KIA.state.ui.getSelectionId();
	const style = Object.assign({}, KIA.nodesMap[id].style);
	
	style['color'] = style['color'] || '';
	style['width'] = parseInt(style['width']) || '';
	style['height'] = parseInt(style['height']) || '';
	style['font-size'] = parseInt(style['font-size']) || '';
	style['font-weight'] = parseInt(style['font-weight']) || '';
	style['letter-spacing'] = parseInt(style['letter-spacing']) || '';
	style['line-height'] = parseInt(style['line-height']) || '';

	for(let p in style) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = style[p];
	}

}

export default Index;