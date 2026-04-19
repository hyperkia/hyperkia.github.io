
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
		const id = props.eTarget.closest('[data-page]').dataset.page;
		const ids = new Set().add(id);
        KIA.actions.share.setSelectionKeys(ids, {source: props.root});
	}

	static changePageVisiblility(){
		const pageEl = props.eTarget.closest('[data-page]');
		const id = pageEl.dataset.page;
		KIA.actions.kiaPages.changePageVisiblility(id);
		const pageObj = KIA.nodesMap[id];
		pageEl.querySelector('[data-visiblity]').dataset.visiblity = pageObj.style.visibility;
		const ids = new Set().add('canvas');
        KIA.actions.share.setSelectionKeys(ids, {source: props.root});
	}

	static changePagePointerLock(){
		KIA.actions.kiaPages.changePagePointerLock(props.pageKey);
		const pageObj = KIA.state.pages.getProp('map')[props.pageKey];
		props.pageEl.querySelector('[data-lock]').dataset.lock = pageObj.css['pointer-events'];
	}

	static addNewPage(){
		const pageObject = {
	        id: crypto.randomUUID(),
	        title: 'Page 1',
	        style: {
	            'background-color': '#ffffffff',
	            width: '1920px',
	            height: '6000px',
	            'pointer-events': 'auto',
	            visibility: 'visible',	            
	        },
	        children: [],
	        instanceof: 'document',
	        createdAt: Date.now(),            
	    }

		KIA.actions.kiaPages.createPage(pageObject);
		const editElement = KIA.kiaPages._qs(`[data-page="${pageObject.id}"] .page-name`);
		KIA.utils.dom.enableEditingAndFocusEnd(editElement);
		const ids = new Set().add(pageObject.id);
		KIA.actions.share.setSelectionKeys(ids);
	}

}

export default Index;