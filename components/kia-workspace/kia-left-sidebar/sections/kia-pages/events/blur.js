
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTAction === 'editPageName') this.pageNameChange(e);
	}

	static pageNameChange(){
		const id = props.eTarget.closest('[data-page]')?.dataset.page;
		const pageNameEl = props.eTarget.closest('.page-name')
		const name = pageNameEl.innerText.trim() ? pageNameEl.innerText : pageNameEl.dataset.oldValue;
		KIA.dom.kiaPages.disablePageNameEdit({id}); 
	}

}

export default Index;