
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eRTarget.matches('[data-prop="color"]') && props.eTarget.closest('.label')) this.openColorPicker();
		if(props.eRTAction === 'addFontFamily') KIA.actions.kiaModals.openModal('kiaFontLibraryModal');
	}

	static openColorPicker(){
		const value = KIA.propInputs['color'].value;
		KIA.actions.share.openColorPicker({type: 'css', property: 'color', value, });
	}

}

export default Index;