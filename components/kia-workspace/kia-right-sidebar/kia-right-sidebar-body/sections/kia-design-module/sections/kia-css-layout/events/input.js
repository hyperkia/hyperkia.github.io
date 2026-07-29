
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {
	static handler(e) {
		if(props.eTarget.matches('[data-prop*="padding-"]')) this.paddingInput();
	}

	static paddingInput(){
		const css = KIA.utils.dom.controlToCss(props.eTarget);
        KIA.managers.style.propsInputToSelection(css);
	}
}

export default Index;