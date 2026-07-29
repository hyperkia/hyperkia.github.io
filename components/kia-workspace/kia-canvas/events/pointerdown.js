import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		props.dX = e.clientX;
		props.dY = e.clientY;
		if (e.button !== 0) return;

		const activeTool = KIA.state.ui.getProp('activeTool');
		const pressedKey = KIA.state.ui.getProp('activePressedkeyCode');
		props.pointerDownTool = pressedKey === 'space' ? 'hand' : activeTool;

		this.eTarget = e.composedPath()[0];
		const activePage = this.eTarget?.closest('[data-page]');
        const activeLayer = KIA.dom.read.getTopSelectAbleLayerFromPoint(e);
        
        if(activeTool === 'triangle') {
	        let ids = new Set();
	        // let skipSelectionIds = false;
	        const currentTarget = props.root.shadowRoot.elementFromPoint(e.clientX, e.clientY) || props.root;
	        if(currentTarget.closest('[data-layer]')) {
	        	 ids.add(activeLayer.dataset.layer)
	        } else if (currentTarget.closest('[data-page]')) {
	        	ids.add(activePage.dataset.page);
	        } else if (currentTarget.matches('.pages')) {
	        	ids.add('canvas');
	        } else if(currentTarget.closest('kia-canvas')) {
	        	ids.add('canvas');
	        } 	        
 
	        if(ids.size>0) KIA.actions.share.setSelectionIds(ids, {source: props.root});	        
	    }

	    props.root.tools[props.pointerDownTool].handlePointerDown(e);
	    this.pointerDownActions();
	}	

	static pointerDownActions(){
		if(!this.eTarget.matches('.resize-controller-point')) KIA.kiaCanvas.$id.resizeController.style.cssText = '';
	}
}

export default Index;