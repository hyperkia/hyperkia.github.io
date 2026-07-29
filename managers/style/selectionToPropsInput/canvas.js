
import propHandler from '../propsHandler/index.js';

function Index() {
	
	const style = Object.assign({}, KIA.state.canvas.getProp('style'));

	style['font-size'] = parseInt(style['font-size']) || '';
	style['font-weight'] = parseInt(style['font-weight']) || '';
	style['letter-spacing'] = parseInt(style['letter-spacing']) || '';
	style['line-height'] = parseInt(style['line-height']) || '';

	for(let p in style) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = style[p];
	}

}

export default Index;