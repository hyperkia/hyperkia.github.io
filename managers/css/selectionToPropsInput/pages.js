
import propHandler from '../propsHandler/index.js';

function Index() {
	
	const key = KIA.dom.read.getSelectionKey();
	const css = Object.assign({}, KIA.state.pages.map[key].css);
	
	css['color'] = css['color'] || '';
	css['width'] = parseInt(css['width']) || '';
	css['height'] = parseInt(css['height']) || '';
	css['font-size'] = parseInt(css['font-size']) || '';
	css['font-weight'] = parseInt(css['font-weight']) || '';
	css['letter-spacing'] = parseInt(css['letter-spacing']) || '';
	css['line-height'] = parseInt(css['line-height']) || '';

	for(let p in css) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = css[p];
	}

}

export default Index;