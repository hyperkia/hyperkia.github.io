
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.root.$id.fontSearch.value.trim().length>1) return;
		methods.scrollEndFetchMoreFonts();		  		
	}

}

export default Index;