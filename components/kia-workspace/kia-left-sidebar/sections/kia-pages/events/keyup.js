
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTAction === 'editPageName') this.setTitle(e);
	}

	static setTitle(e){
		const pageNameEl = props.eTarget.closest('.page-name');
		const pageItemEl = pageNameEl.closest('.page-item');
		const title = pageNameEl.textContent.trim() ? pageNameEl.textContent : pageNameEl.dataset.oldValue;
		KIA.actions.kiaPages.setTitle({
			id: pageItemEl.dataset.page, 
			title,
		});
	}

}

export default Index;