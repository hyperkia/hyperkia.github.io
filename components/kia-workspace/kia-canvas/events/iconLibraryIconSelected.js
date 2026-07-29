
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(e.detail.source === 'kiaIconLibrary' && e.detail.iconName) this.iconLibraryIconSelected(e);
	}

	static iconLibraryIconSelected(e){
		const iconName = e.detail.iconName;
		props.moreIcon = KIA.data.icons.getIcon('fontawesome', iconName);
	}

}

export default Index;