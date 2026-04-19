
import props from '../props.js';

function Index(obj){
	props.colorPicker.value = obj.value;
	props.colorPicker.open = true;
	props.colorPicker.target.type = obj.type;
	props.colorPicker.target.payload.property = obj.property;
	KIA.observer.ui.observe('openColorPicker');
}

export default Index;