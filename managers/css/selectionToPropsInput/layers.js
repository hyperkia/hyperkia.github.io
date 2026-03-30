
import propHandler from '../propsHandler/index.js';

function Index() {

	const key = KIA.dom.read.getSelectionKey();
	const propsInputCss = {};
	
	for(let ph in propHandler) {
		propHandler[ph]('SelectionToPropsInput', propsInputCss);
	}

	for(let p in propsInputCss) {
		if(KIA.propInputs[p]) KIA.propInputs[p].value = propsInputCss[p];
	}

}

export default Index;