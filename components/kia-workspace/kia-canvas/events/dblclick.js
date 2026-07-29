
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eTarget.matches('.canvas-layer')) this.textContentLayer();
	}

	static textContentLayer(){
		const tool = KIA.state.ui.getProp('activeTool');
		if(tool !== 'triangle') return;
		const id = props.eTarget.dataset.layer; 
		methods.editTextLayerById(id);
	}

	
}

export default Index;