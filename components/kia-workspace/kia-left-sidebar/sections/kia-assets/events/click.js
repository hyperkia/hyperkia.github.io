
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eRTAction === 'showSearch') this.toggleSearch('show');
		if(props.eRTAction === 'hideSearch') this.toggleSearch('show');
	}

	static toggleSearch(className){
		props.root.$id.searchBox.classList.toggle(className);
		props.root.$id.searchInput.focus();
	}

}

export default Index;