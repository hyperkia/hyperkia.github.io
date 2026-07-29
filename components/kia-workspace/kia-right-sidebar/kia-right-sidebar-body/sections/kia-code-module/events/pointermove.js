
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		props.pointer.mX = e.clientX;
		props.pointer.mY = e.clientY;		
	}
	
}

export default Index;
