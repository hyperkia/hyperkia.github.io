

import props from './props.js';


const Methods = {

	markupSetup(thisEl){
		const tempEl = document.createElement('div');
		thisEl.shadowRoot.appendChild(tempEl);
		tempEl.insertAdjacentHTML('afterend', thisEl.innerHTML)
		thisEl.innerHTML = '';
		tempEl.remove();
		thisEl.$id.details = thisEl._qs('details');
		thisEl.$id.summary = thisEl._qs('summary');
		thisEl.$id.options = thisEl._qs('.select-options');
	},

	setDropdownPosition(thisEl){
		this.close();
		props.currentOpenedDropdown = thisEl;
		KIA.actions.ui.shortcutsKey.pushEscapeStack({
            close: this.close,
            id: 'kiaSelect',
        });
	}, 
 
	dropDownItemSelected(){
		const dEl = props.eRootNode.$id.details;
		dEl.querySelector('.select-option.selected')?.classList.remove('selected');
		const currentSelected = props.eTarget.closest('.select-option');
		currentSelected.classList.add('selected');		
		props.eRootNode.setAttribute('value', currentSelected.getAttribute('value'));
	
		dEl.removeAttribute('open');
		dEl.children[0].innerText = currentSelected.textContent.trim();
		
		props.eRootNode.dispatchEvent(new CustomEvent('kiaSelectOptionChange', {
		  bubbles: true,
		  composed: true,
		  detail: { source: props.eRootNode}
		}));
	},

	selectedValueOption(thisEl, value){		
		const dEl = thisEl.$id.details;
		const optionEl = dEl.querySelector(`.select-option[value="${value}"]`);		
		if(!optionEl) return;

		thisEl.setAttribute('value', value)
		dEl.querySelector('.select-option.selected')?.classList.remove('selected');
		optionEl.classList.add('selected');
		dEl.querySelector('.select-trigger').innerText = optionEl.textContent.trim();
	},

	close(){
		props.currentOpenedDropdown?.$id.details.removeAttribute('open');
	}

}

export default Methods;




