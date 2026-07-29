function Index() {
	const name = KIA.state.ui.getProp('openModal');
	KIA.kiaModals.classList.add('show');
    if(!KIA[name]) {
    	const tagName = KIA.utils.string.camelToKebab(name);
    	const element = document.createElement(tagName);
    	element.classList.add('modal', 'show');
    	element.setAttribute('data-class', 'modal');
    	KIA.kiaModals.$id.modals.appendChild(element);        
    }
    KIA[name].classList.add('show');
    KIA[name].open?.();
}

export default Index;