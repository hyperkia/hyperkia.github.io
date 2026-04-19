
import props from '../utils/props.js';

const Index = {

	updatePageNamePosition: function() {
		if(props.isZooming) {
			KIA.dom.kiaCanvas.setPageNamePosition();
			KIA.dom.kiaCanvas.createSelectionLayersOutline();
			KIA.dom.kiaCanvas.drawMultiElementsSelectionBound();			
			props.rafZoomingID = requestAnimationFrame(Index.updatePageNamePosition);
		}
	},
}

export default Index;