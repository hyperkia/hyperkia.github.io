
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
		const navEl = props.root.$id.nav;
		navEl.classList.toggle('show');
		const isShow = navEl.classList.contains('show');
		if(isShow) {
			KIA.actions.ui.shortcutsKey.pushEscapeStack({
	            close: props.root.close,
	            id: 'kiaLeftHeader',
	        });
		}

		if(!isShow) {			
			const menuItems = props.root._qsAll('.menu-item.hover');
			menuItems.forEach(mi => mi.classList.remove('hover'));
		}
	}

	static menuAction(){
		const action = props.eTarget.dataset.action;
		menuActions[action]?.();
		props.root.$id.nav.classList.remove('show');
	}



} 

export default Index;