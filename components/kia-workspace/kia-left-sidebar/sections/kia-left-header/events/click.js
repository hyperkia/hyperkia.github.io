
import props from '../utils/props.js';
import methods from '../utils/methods.js';
import menuActions from '../menu-action/index.js';

class Index {

	static handler(e){
		if(props.eRTAction === 'flipSidebar') props.root._emitEvent('UI_LEFT_SIDEBAR_COLLAPSE_CHANGE');
		if(props.eRTAction === 'toggleMenuVisibility') this.toggleMenuVisibility();
		if(props.eTarget.matches('[data-action]')) this.menuAction();
	}

	static toggleMenuVisibility(){
		props.root.$id.nav.classList.toggle('show');
	}

	static menuAction(){
		const action = props.eTarget.dataset.action;
		menuActions[action]?.();
		props.root.$id.nav.classList.remove('show');
	}



} 

export default Index;