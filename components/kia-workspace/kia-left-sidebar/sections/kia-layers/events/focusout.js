
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eTarget.matches('.title[contenteditable="true"]')) methods.removeCloneItemContentEls();
	}
	
}

export default Index;