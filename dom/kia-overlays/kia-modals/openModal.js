function Index() {
	const name = KIA.state.ui.openModal;
	KIA.kiaModals.classList.add('show');
    if(!KIA[name]) {
    	const nodeName = KIA.utils.string.camelToKebab(name);
    	const element = document.createElement(nodeName);
    	element.classList.add('modal', 'show');
    	element.setAttribute('data-class', 'modal');
    	KIA.kiaModals.shadowRoot.appendChild(element);
    }
    KIA[name].classList.add('show');
}

export default Index;