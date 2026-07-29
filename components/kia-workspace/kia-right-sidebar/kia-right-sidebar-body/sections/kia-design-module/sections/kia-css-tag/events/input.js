
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		if(props.eTAction === 'tagSrc') this.inputSrc();
		if(props.eTAction === 'tagInnerText') methods.inputInnerText(e);
	}

	static inputSrc(){
		const src = props.eTarget.value.trim();
		methods.inputSrc(src);
	}
}
 
export default Index;