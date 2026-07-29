
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(e.detail.source.dataset.name = 'changeTagName') this.changeTagName(e);		
	}

	static changeTagName(e){
		const id = KIA.state.ui.getSelectionId();
		let tagName = e.detail.source.value;
		const layerNewObj = {
			id,
			tagName
		};
		KIA.actions.kiaLayers.setTagName(layerNewObj);		
	}

}

export default Index;