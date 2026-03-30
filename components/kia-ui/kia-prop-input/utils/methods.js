

import props from './props.js';


const Methods = {
 
	markupSetup(thisEl){		
		let html = '<div class="input-wrapper">';
		const dataset = thisEl.dataset;

		if(dataset.labelIcon) {
			html += `<label class="label" part="label">
						<svg class="label-svg" part="label-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#${dataset.labelIcon}-symbol"></use></svg>
					</label>`;
		} else if(dataset.labelText) {
			html += `<label class="label" part="label">${dataset.labelText}</label>`;
		} else if (dataset.labelCustomicon) {
			html += `<label class="label" part="label"><i part="custom-icon"></i></label>`;			
		}

		let attrs = '';
		if(dataset.prop) attrs += `data-prop="${dataset.prop}" `;
		if(dataset.unit) attrs += `data-unit="${dataset.unit}" `;
		if(dataset.type) attrs += `type="${dataset.type}" `;
		if(dataset.min) attrs += `min="${dataset.min}" `;
		if(dataset.max) attrs += `max="${dataset.max}" `;
		if(dataset.maxlength) attrs += `maxlength="${dataset.maxlength}" `;
		if(dataset.step) attrs += `step="${dataset.step}" `;
		if(dataset.placeholder) attrs += `placeholder="${dataset.placeholder}" `;

		html += `
			<input class="input" part="input" ${attrs}>
			<kia-button class="variable-button" data-icon="gear-solid-full-symbol"></kia-button>
		`;

		thisEl.shadowRoot.lastElementChild.insertAdjacentHTML('afterend', html);		
		thisEl.$id.input = thisEl._qs('input');

		if(!KIA.propInputs) KIA.propInputs = {};
		KIA.propInputs[dataset.prop] = thisEl;
	},



}

export default Methods;




