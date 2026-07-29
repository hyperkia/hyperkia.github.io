
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		if(props.eTEvent === 'tagInnerText') methods.inputInnerText(e); 
		if(props.eTEvent === 'tagSrc') this.inputSrc(); 
	}

	static inputSrc(){
		const src = props.eTarget.value.trim();
		methods.inputSrc(src);
	}

	
}
 
export default Index;