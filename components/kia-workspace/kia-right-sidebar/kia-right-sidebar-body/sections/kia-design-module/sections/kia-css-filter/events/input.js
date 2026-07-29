 
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const layerId = KIA.state.ui.getSelectionId();
		const inputEl = e.target;
		const type = inputEl.dataset.prop.replace('filter-','');
		const stackId = inputEl.dataset.stack;
		const layerNewObj = {
        	id: layerId,
        	updateStack: {
				id: stackId,
	        	value: {
	        		amount: inputEl.value,
	        	}
			}
		};

        KIA.actions.kiaLayers.updateStack(layerNewObj);
	}

}

export default Index;