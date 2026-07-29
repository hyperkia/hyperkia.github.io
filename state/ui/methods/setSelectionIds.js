
import props from '../props.js';

function Index(ids){
	if(ids.size === 0) ids.add('canvas');
	props.selectionKeys = ids;
	KIA.observer.ui.observe('setSelectionIds');
}

export default Index; 