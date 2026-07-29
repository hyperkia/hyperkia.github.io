
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		if (props.eTarget.dataset.event === 'canvasZoom') {	
			if (props.rafZoomingID !== null) {
				cancelAnimationFrame(props.rafZoomingID);
				props.rafZoomingID = null;
			}
			props.isZooming = true;
			methods.canvasZooming();
		}
	}

	
}

export default Index;