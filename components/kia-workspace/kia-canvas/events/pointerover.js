
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		props.activeLayer = props.eTarget?.closest('[data-layer]');
        props.activeLayerIndex = props.eTarget?.dataset.layer;
		if(props.activeLayer) this.layerPointerOver();		
	}

	static layerPointerOver(){
		if(KIA.state.ui.getProp('activeTool') === 'triangle') {			
			props.root._qs('.hover-layer')?.classList.remove('hover-layer');
			props.activeLayer.classList.add('hover-layer');		
			KIA.dom.kiaCanvas.createSelectionLayersOutline();
		}
	}
}

export default Index;