
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const titleEl = props.eTarget.closest('.layer-node')?.querySelector('.title');
		if(!titleEl) return;
		const key = e.key;
		if (key === 'Enter' || key === 'Escape') {
	        e.preventDefault();
        	titleEl.blur();
	    }
	}

}

export default Index;