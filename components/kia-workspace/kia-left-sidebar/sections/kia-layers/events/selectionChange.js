
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		KIA.dom.kiaLayers.scrollIntoViewSelection();
		methods.activeSelection();
	}

	
}

export default Index;