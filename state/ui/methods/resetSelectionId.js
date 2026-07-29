
import props from '../props.js';

function Index(){
	props.selectionKeys = new Set().add('canvas');
	KIA.observer.ui.observe('setSelectionIds');
}

export default Index;