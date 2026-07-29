
import props from '../props.js';

function Index(theme){
	props.preferenceTheme = theme;
	KIA.observer.ui.observe('setPreferenceTheme');
}

export default Index;