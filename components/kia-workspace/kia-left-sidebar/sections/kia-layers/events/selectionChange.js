
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		KIA.dom.kiaLayers.scrollIntoViewSelection();
		KIA.dom.kiaLayers.activeSelectionInUI();
	}

	
}

export default Index;