
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const propEl = e.detail.source;
		if(propEl.matches('[data-prop="color"]')) {
			KIA.propInputs.color.style.setProperty('--value', propEl.value);
		}
	}

	

}

export default Index;