
import props from '../props.js';

function Index(){
	props.openModal = null;
	KIA.observer.ui.observe('closeModal');
}

export default Index;