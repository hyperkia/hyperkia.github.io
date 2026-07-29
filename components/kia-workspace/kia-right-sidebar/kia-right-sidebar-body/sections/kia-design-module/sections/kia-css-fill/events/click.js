
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eRTarget.matches('[data-prop="background-color"]') && props.eTarget.closest('.label')) this.openColorPicker();		
	}

	static openColorPicker(){
		const value = KIA.propInputs['background-color'].value;
		KIA.actions.share.openColorPicker({type: 'css', property: 'background-color', value});
	}

}

export default Index;