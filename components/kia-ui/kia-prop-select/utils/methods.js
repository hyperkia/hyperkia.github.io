

import props from './props.js';
 

const Methods = {

	markupSetup(thisEl){
		const tempEl = document.createElement('div');
		thisEl.shadowRoot.appendChild(tempEl);
		tempEl.insertAdjacentHTML('afterend', thisEl.innerHTML)
		thisEl.innerHTML = '';
		tempEl.remove();
		thisEl.$id.details = thisEl._qs('details');

		KIA.propInputs[thisEl.dataset.prop] = thisEl;
	},

	setDropdownPosition(){},  

	dropDownItemSelected(){
		const dEl = props.eRootNode.$id.details;
		dEl.querySelector('.select-option.selected')?.classList.remove('selected');
		const currentSelected = props.eTarget.closest('.select-option');
		currentSelected.classList.add('selected');		
		const value = currentSelected.getAttribute('value');
		props.eRootNode.setAttribute('value', value);
		dEl.removeAttribute('open');
		dEl.children[0].innerText = currentSelected.textContent.trim();

		const css = {
			[props.eRootNode.dataset.prop]: value,			
		};

        KIA.managers.style.propsInputToSelection(css);
		
		props.eRootNode.dispatchEvent(new CustomEvent('kiaSelectOptionChange', {
		  bubbles: true,
		  composed: true,
		  detail: { source: props.eRootNode}
		}));
	},

	selectedValueOption(thisEl, value){		
		const dEl = thisEl.$id.details;
		const optionEl = dEl.querySelector(`.select-option[value='${value}']`);		
		if(!optionEl) return;

		thisEl.setAttribute('value', value)
		dEl.querySelector('.select-option.selected')?.classList.remove('selected');
		optionEl.classList.add('selected');
		dEl.querySelector('.select-trigger').innerText = optionEl.textContent.trim();		
	}

}

export default Methods;




