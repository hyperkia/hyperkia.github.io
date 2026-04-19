
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.matches('.title')) this.updateLayerTitle(e);
	}

	static updateLayerTitle(){		
		const id = props.eTarget.closest('[data-item]')?.dataset.item;
		const titleEl = props.eTarget.closest('.title');
		const title = titleEl.textContent || titleEl.dataset.oldValue;
		const newLayerObj = {
			id,
			title,
		};
		props.eTarget.closest('.header').setAttribute('data-title', title);
		KIA.actions.kiaLayers.setTitle(newLayerObj);
	}

}

export default Index;