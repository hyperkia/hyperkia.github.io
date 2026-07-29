
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	activeLayer = null;

	static handler(e){
		this.activeLayer = KIA.dom.read.getTopSelectAbleLayerFromPoint(e);
		if(this.activeLayer) this.layerPointerOver();		
	}

	static layerPointerOver(){
		if(KIA.state.ui.getProp('activeTool') === 'triangle') {			
			props.root._qs('.hover-layer')?.classList.remove('hover-layer');
			if(this.activeLayer.dataset.layer === KIA.state.ui.getSelectionId()) return;
			this.activeLayer.classList.add('hover-layer');		
			KIA.dom.kiaCanvas.createSelectionLayersOutline();
		}
	}
}

export default Index;