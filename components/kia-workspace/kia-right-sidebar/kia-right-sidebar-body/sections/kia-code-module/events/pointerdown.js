
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		props.pointer.dX = e.clientX;
		props.pointer.dY = e.clientY;
	}
	
}

export default Index;
