
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		props.pointer.uX = e.clientX;
		props.pointer.uY = e.clientY;		
	}
	
}

export default Index;
