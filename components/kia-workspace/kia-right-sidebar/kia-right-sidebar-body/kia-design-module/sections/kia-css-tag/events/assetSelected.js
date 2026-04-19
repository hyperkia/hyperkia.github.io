
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const d = e.detail;
		methods.inputSrc(d.id);			
	}

}

export default Index;