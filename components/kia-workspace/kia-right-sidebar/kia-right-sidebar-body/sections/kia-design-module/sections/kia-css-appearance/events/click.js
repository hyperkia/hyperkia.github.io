
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(){		
		if(props.eRTAction === 'toggleAllRadius') props.eRTarget.classList.toggle('toggle-all-radius');
	}

}

export default Index;