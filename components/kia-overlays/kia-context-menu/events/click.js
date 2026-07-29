
import props from '../utils/props.js';
import * as actions from '../actions/index.js';

class Index {

	static handler(e){		
		const action = props.eTarget.closest('[data-action]')?.dataset.action;
		if(action) {
			const actionFor = props.root.dataset.for;
			actions[actionFor].fire(action);
		}		
		props.root.classList.remove('show');
	}

}

export default Index;