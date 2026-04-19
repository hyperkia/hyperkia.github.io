 
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		props.dX = e.clientX;
		props.dY = e.clientY;

		this.eTarget = e.composedPath()[0];
		props.activePage = this.eTarget?.closest('[data-page]');
		props.activePageKey = props.activePage?.dataset.page;
        props.activePageRect = props.activePage?.getBoundingClientRect();
        props.activeLayer = this.eTarget?.closest('[data-layer]');
        props.activeLayerCSS = props.activeLayer ? window.getComputedStyle(props.activeLayer) : null;
        props.activeLayerKey = props.activeLayer?.dataset.layer;
        
        if(KIA.state.ui.getProp('activeTool') === 'triangle') {
	        let keys = new Set();
	        const currentTarget = props.root.shadowRoot.elementFromPoint(e.clientX, e.clientY) || props.root;
	        if(currentTarget.closest('[data-layer]')) {
	        	 keys.add(props.activeLayerKey)
	        } else if (currentTarget.closest('[data-page]')) {
	        	keys.add(props.activePageKey);
	        } else if(currentTarget.closest('kia-canvas')) {
	        	keys.add('canvas');
	        } else if (currentTarget.matches('.canvas-selection')) {
	        	keys = KIA.state.ui.getSelectionId();
	        }

	        KIA.actions.share.setSelectionKeys(keys); 
	    }


	    let tool = KIA.state.ui.getProp('activeTool');	    
        props.root.tools[tool].handlePointerDown(e);
	}
	
}

export default Index;