
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.root.$id.searchIcon.value.trim().length>1) return;
		methods.scrollEndFetchMoreIcons();
	}

}

export default Index;