
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.dataset.prop === 'border-radius') this.setBordeRadiusToAllSides();
	}

	static setBordeRadiusToAllSides(){
		const value = props.eTarget.value;
		KIA.propInputs['border-top-left-radius'].value = value;
		KIA.propInputs['border-top-right-radius'].value = value;
		KIA.propInputs['border-bottom-left-radius'].value = value;
		KIA.propInputs['border-bottom-right-radius'].value = value;
	}

	
	
	
	

}

export default Index;