
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.root.offsetWidth === 0) return;		
		methods.setSelectionTypeUi();
		methods.renderDevUi();
	}

}

export default Index;