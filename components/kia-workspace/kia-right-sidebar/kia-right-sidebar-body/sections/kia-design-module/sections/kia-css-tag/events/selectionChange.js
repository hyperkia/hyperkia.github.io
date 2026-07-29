 
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const selectionType = KIA.dom.read.getSelectionStoreType();
		if(selectionType === 'layers') methods.layerSelected();
	}

}

export default Index;