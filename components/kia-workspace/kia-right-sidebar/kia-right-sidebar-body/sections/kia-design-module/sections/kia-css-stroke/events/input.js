
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.dataset.prop === 'border-width') this.setBorderWidthToAllSides();
	}

	static setBorderWidthToAllSides(){
		const value = props.eTarget.value;
		KIA.propInputs['border-top-width'].value = value;
		KIA.propInputs['border-right-width'].value = value;
		KIA.propInputs['border-bottom-width'].value = value;
		KIA.propInputs['border-left-width'].value = value;
	}

	

}

export default Index;