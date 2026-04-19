
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){			
		if(props.eTarget.matches('.title[contenteditable="true"]')) this.disableLayerTitleEditing();
	}

	static disableLayerTitleEditing(){
		props.eTarget.closest('.item-content')?.remove();
	}

}

export default Index;