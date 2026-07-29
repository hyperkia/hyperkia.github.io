
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if(props.eTarget.closest('[data-layer]')) this.layerPointerOut();
	}

	static layerPointerOut(){		
		props.root._qs('.hover-layer')?.classList.remove('hover-layer');		
		KIA.dom.kiaCanvas.createSelectionLayersOutline();
	}

	
}

export default Index;