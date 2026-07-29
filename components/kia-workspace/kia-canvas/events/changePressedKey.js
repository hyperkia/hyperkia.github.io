
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		props.root.setAttribute('active-pressed-key', e.detail.keyCode);
	}

	

}

export default Index;