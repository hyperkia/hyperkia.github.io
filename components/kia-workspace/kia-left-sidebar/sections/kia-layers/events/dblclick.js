
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eTarget.closest('.title')) this.layerTitleEditable();
	}

	static layerTitleEditable(){
		const headerEl = props.eTarget.closest('.header');
		const id = headerEl.closest('[data-item]').dataset.item;
		if(KIA.state.pages.getProp('map')[id]) return;

		let editElement = headerEl.querySelector('.title[contenteditable="true"]');
		if(!editElement) {			
			const contentEl = props.root.$id.itemContent;
			contentEl.removeAttribute('data-id');
			const contentCloneEl = contentEl.cloneNode(true);
			editElement = contentCloneEl.querySelector('.title');
			props.root.$id.layers.appendChild(contentEl);
			headerEl.appendChild(contentCloneEl);
		}
		KIA.utils.dom.enableEditingAndFocusEnd(editElement);
	}

}

export default Index;




	