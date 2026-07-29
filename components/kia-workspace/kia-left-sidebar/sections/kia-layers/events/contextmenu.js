
import props from '../utils/props.js';

class Index {

	static handler(e){
		const layerId = props.eTarget.closest('.layer-node')?.dataset.item;
		if(layerId) this.openContextMenu(e);		
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