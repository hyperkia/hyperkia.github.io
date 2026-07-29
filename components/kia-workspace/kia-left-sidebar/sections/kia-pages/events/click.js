
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.closest('[data-page]')) this.setSelectionKey();
		if(props.eTAction === 'pageVisible') this.changePageVisiblility();
		if(props.eTAction === 'pageLock') this.changePagePointerLock();
		if(props.eRTAction === 'addNewPage') this.addNewPage();
	}

	static setSelectionKey(){
		methods.activeSelectionInUI();
		const id = props.eTarget.closest('[data-page]').dataset.page;
		const ids = new Set().add(id);
        KIA.actions.share.setSelectionIds(ids, {source: props.root});
	}

	static changePageVisiblility(){		
        const pageEl = props.eTarget.closest('[data-page]');
		const id = pageEl.dataset.page;
		KIA.actions.kiaPages.changeVisibility(id);
		const pageVisibility = KIA.nodesMap[id].style.visibility;
		pageEl.querySelector('.page-visible').dataset.visibility = pageVisibility;		
	}

	static changePagePointerLock(){
        const pageEl = props.eTarget.closest('[data-page]');
		const id = pageEl.dataset.page;
		KIA.actions.kiaPages.changeLock(id);
		const pageLock = KIA.nodesMap[id].style['pointer-events'];
		pageEl.querySelector('.page-lock').dataset.lock = pageLock;
	}

	static addNewPage(){
		const pageObject = structuredClone(KIA.state.config.getProp('newPageObject'));
		pageObject.id = crypto.randomUUID();
		KIA.actions.kiaPages.createPage(pageObject);
		const editElement = KIA.kiaPages._qs(`[data-page="${pageObject.id}"] .page-name`);
		KIA.utils.dom.enableEditingAndFocusEnd(editElement);
		const ids = new Set().add(pageObject.id);
		KIA.actions.share.setSelectionIds(ids);
	}

}

export default Index;