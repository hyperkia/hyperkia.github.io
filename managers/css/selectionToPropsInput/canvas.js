
import propHandler from '../propsHandler/index.js';

function Index() {
	
	const css = Object.assign({}, KIA.state.canvas.css);
	
	for(let ph in propHandler) {
		propHandler[ph](css, 'SelectionToPropsInput');
	}

	for(let p in css) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = css[p];
	}

}

export default Index;