
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		if(props.eTAction === 'tagInnerText') methods.inputInnerText(e); 		
	}

	
}
 
export default Index;