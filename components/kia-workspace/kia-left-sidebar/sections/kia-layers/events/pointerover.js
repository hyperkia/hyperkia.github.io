
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eTarget.matches('.header')) this.renderItemContent();
	}

	static renderItemContent(){
		const headerEl = props.eTarget.closest('.header');
		const isTitleEditable = headerEl.querySelector('.title[contenteditable="true"]');
		if(isTitleEditable) return;

		const contentEl = props.root.$id.itemContent;
		headerEl.appendChild(contentEl);
		contentEl.querySelector('.title').textContent = headerEl.getAttribute('data-title');
	}

}

export default Index;




	