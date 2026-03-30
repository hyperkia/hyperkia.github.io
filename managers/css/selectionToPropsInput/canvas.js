
import propHandler from '../propsHandler/index.js';

function Index() {
	
	const css = Object.assign({}, KIA.state.canvas.css);
		
	css['font-size'] = parseInt(css['font-size']) || '';
	css['font-weight'] = parseInt(css['font-weight']) || '';
	css['letter-spacing'] = parseInt(css['letter-spacing']) || '';
	css['line-height'] = parseInt(css['line-height']) || '';

	for(let p in css) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = css[p];
	}

}

export default Index;