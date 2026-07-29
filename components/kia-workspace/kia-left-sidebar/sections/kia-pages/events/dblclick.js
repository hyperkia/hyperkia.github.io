
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){			
		if(props.eTAction === 'editPageName' || props.eTarget.matches('.page-item')) this.enablePageNameEdit();
	}

	static enablePageNameEdit(){
		const id = props.eTarget.closest('[data-page]').dataset.page;
		const editElement = KIA.kiaPages._qs(`[data-page="${id}"] .page-name`);
		const ids = new Set().add(id);
        KIA.actions.share.setSelectionIds(ids);
		KIA.utils.dom.enableEditingAndFocusEnd(editElement);
	}

}

export default Index;