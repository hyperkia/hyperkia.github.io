
import propHandler from '../propsHandler/index.js';

function Index() {

	const key = KIA.dom.read.getSelectionKey();
	const lCss = Object.assign({}, KIA.state.layers.map[key].css);
	
	for(let ph in propHandler) {
		propHandler[ph](lCss, 'SelectionToPropsInput');
	}

	for(let p in lCss) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = lCss[p];
	}

}

export default Index;