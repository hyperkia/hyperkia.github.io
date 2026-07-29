
import props from '../utils/props.js';

const Methods = {	
	removeCloneItemContentEls(){
		props.root._qsAll('.clone-item-content').forEach(el => el.remove());
	}
};

export default Methods;