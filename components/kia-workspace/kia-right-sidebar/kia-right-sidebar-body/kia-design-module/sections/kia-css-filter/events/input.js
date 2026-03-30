 
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const layerKey = KIA.dom.read.getSelectionKey();
		const inputEl = e.target;
		const name = inputEl.dataset.prop.replace('filter-','');
		const stackKey = inputEl.dataset.stack;
        const layerNewObj = {
        	key: layerKey,
        	stack: {
        		[stackKey]: {
        			key: stackKey,
	        		value: inputEl.value+inputEl.dataset.unit,
        		}	        	
        	}
		};
        KIA.actions.share.setLayerSelectionStack(layerNewObj); 
	}

}

export default Index;