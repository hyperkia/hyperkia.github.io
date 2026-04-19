
import props from '../props.js';

function Index(modalName){
	props.openModal = modalName;
	KIA.observer.ui.observe('openModal');
}

export default Index;