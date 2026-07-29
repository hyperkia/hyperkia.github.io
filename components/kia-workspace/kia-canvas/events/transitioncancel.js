
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if (props.eTarget.dataset.event === 'canvasZoom') {
			props.isZooming = false;
			cancelAnimationFrame(props.rafZoomingID);
			props.rafZoomingID = null;
			props.root.$id.pages.classList.remove('canvas-zooming');
			KIA.dom.kiaCanvas.createSelectionLayersOutline();
			KIA.dom.kiaCanvas.selectionLayerResizeController();
		}
	}

	
}

export default Index;