
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const sourceEl = e.detail.source;
		if(sourceEl.matches('.effect-field-color')) {
			sourceEl.style.setProperty('--value', sourceEl.value);
			methods.updateEffect();
		}
	}

}

export default Index;