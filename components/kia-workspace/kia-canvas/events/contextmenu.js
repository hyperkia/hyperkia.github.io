
import props from '../utils/props.js';

class Index {

	static handler(e){
		if(props.eTarget.matches('.canvas-layer') || props.eTarget.matches('.page')) this.openContextMenu(e);		
	}

	static openContextMenu(e){		
		KIA.kiaApp.dispatchEvent(new CustomEvent('openContextMenu', {
		  bubbles: true,
		  composed: true,
		  detail: { e }
		})); 
	}
	
}

export default Index;