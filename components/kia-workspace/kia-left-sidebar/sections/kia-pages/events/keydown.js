
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const pageNameEl = props.eTarget.closest('.page-item')?.querySelector('.page-name');
		if(!pageNameEl) return;
		const key = e.key;
		if (key === 'Enter' || key === 'Escape') {
	        e.preventDefault();
        	pageNameEl.blur();
	    }
	} 

}

export default Index;