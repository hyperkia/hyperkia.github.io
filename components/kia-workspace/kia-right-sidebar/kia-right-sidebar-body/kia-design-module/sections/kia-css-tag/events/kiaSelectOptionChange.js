
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(e.detail.source.dataset.name = 'changeNodeName') this.changeNodeName(e);		
	}

	static changeNodeName(e){
		const key = KIA.dom.read.getSelectionKey();
		let nodeName = e.detail.source.value;
		const layerNewObj = {
			key,
			nodeName
		};
		KIA.actions.share.setLayerSelectionStringProperties(layerNewObj);		
	}

}

export default Index;