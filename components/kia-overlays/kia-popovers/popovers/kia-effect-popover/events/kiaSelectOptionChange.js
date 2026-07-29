
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(e.detail.source.dataset.name === 'inset') methods.updateEffect();
	}

}

export default Index;