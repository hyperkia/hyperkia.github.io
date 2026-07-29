
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eRTarget.matches('[data-prop="border-color"]') && props.eTarget.closest('.label')) this.openColorPicker();		
		if(props.eRTAction === 'toggleAllWidth') props.eRTarget.classList.toggle('toggle-all-width');
	}

	static openColorPicker(){
		KIA.actions.share.openColorPicker({type: 'css', property: 'border-color'});
	}

}

export default Index;