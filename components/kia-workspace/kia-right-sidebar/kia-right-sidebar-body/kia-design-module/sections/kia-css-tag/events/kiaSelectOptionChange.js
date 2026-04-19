
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(e.detail.source.dataset.name = 'changeNodeName') this.changeNodeName(e);		
	}

	static changeNodeName(e){
		const id = KIA.state.ui.getSelectionId();
		let nodeName = e.detail.source.value;
		const layerNewObj = {
			id,
			nodeName
		};
		KIA.actions.kiaLayers.setNodeName(layerNewObj);		
	}

}

export default Index;