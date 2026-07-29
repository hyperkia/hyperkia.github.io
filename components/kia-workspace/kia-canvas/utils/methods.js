
import props from '../utils/props.js';

const Index = {

	canvasZooming: function() {
		if(props.isZooming) {
			KIA.dom.kiaCanvas.setPageNamePosition();
			KIA.dom.kiaCanvas.createSelectionLayersOutline();
			KIA.dom.kiaCanvas.selectionLayerResizeController();		
			KIA.dom.kiaCanvas.drawMultiElementsSelectionBound();
			props.rafZoomingID = requestAnimationFrame(Index.canvasZooming);			
		}
	},

	editTextLayerById(id){
		if(!id) return;
		props.root._qs('[contenteditable="true"]')?.removeAttribute('contenteditable');

		const layerObj = KIA.nodesMap[id];
		const isTextLayer = (layerObj.children.length === 0 && 'textContent' in layerObj);
        if(isTextLayer) {
			const layerEl = KIA.canvasRefMap[id];			
	        layerEl.focus();
	        const ids = new Set().add(layerEl.dataset.layer);
	        KIA.actions.share.setSelectionIds(ids);
	        KIA.utils.dom.enableEditingAndFocusEnd(layerEl);	        

	        return true;
        }
	}
}

export default Index;