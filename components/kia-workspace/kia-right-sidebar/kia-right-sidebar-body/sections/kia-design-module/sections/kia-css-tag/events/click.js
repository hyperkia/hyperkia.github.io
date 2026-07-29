
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eRTAction === 'setTagSrc') KIA.actions.kiaModals.openModal('kiaAssetsManagerModal');
	}


}

export default Index;