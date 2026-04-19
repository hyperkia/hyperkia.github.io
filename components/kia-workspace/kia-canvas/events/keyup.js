
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		if(props.eTarget.matches('.canvas-layer')) this.setTextContent(e);
	}

	static setTextContent(e) {
		const id = props.eTarget.dataset.layer;
		const textContent = props.eTarget.textContent;
		KIA.actions.kiaLayers.setTextContent({
			textContent,
			id,
			source: 'kiaCanvas',
		}); 
	}
}

export default Index;