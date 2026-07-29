
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if(props.eTarget.matches('[contenteditable="true"].canvas-layer')) { 
			props.eTarget.removeAttribute('contenteditable');
			const textContentLength = props.eTarget.textContent.trim().length;
			if(textContentLength === 0) KIA.actions.kiaLayers.deleteLayer(props.eTarget.dataset.layer);
		}
	}
	
}

export default Index;