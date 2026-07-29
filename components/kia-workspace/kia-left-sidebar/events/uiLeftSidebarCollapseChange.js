
import props from '../utils/props.js';

class Index {

	static handler(e){		
		this.toggleSidebarPanel();
	}

	static toggleSidebarPanel(){
		props.root.classList.toggle('show');
	}

}

export default Index;