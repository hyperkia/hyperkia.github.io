import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

class KIA_Input extends KIACustomElement{

	customizer = {styleHref: `/components/kia-ui/kia-input/style.css?v=${cacheVersion}`};

	constructor(){
		super();
		this.html = html;
		this.moduleURL = import.meta.url;
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});
		this._defaultSetup();
		this.markupSetup(this);		
	}

	handleEvents(e){		
		// if (Date.now() - this.lastThrottle < 50) return; 
		// props.eTarget = e.composedPath()[0];
		// props.eRootNode = props.eTarget.getRootNode().host;
        // this.lastThrottle = Date.now();
        // Events[e.type]?.handler?.(e);
	}

	get value() {
		return this.$id.input.value;
	}

	set value(value) {
		this.$id.input.value = value;
		this.dispatchEvent(new CustomEvent('kiaInput', {
		  bubbles: true,
		  composed: true,
		  detail: { source: this}
		}));	
	}

	set type(value) {
		this.$id.input.type = value;
	}

	focus(){
		this.$id.input.focus();
	}

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
		if(dataset.prop) attrs += `data-prop="${dataset.prop}"`;
		if(dataset.unit) attrs += `data-unit="${dataset.unit}"`;
		if(dataset.default) attrs += `data-default="${dataset.default}"`;
		if(dataset.type) attrs += `type="${dataset.type}"`;
		if(dataset.min) attrs += `min="${dataset.min}"`;
		if(dataset.max) attrs += `max="${dataset.max}"`;
		if(dataset.step) attrs += `step="${dataset.step}"`;
		if(dataset.placeholder) attrs += `placeholder="${dataset.placeholder}"`;
		html += `
			<input class="input" part="input" ${attrs}>
			<kia-button class="variable-button" data-icon="gear-solid-full-symbol"></kia-button>
		`;

		thisEl.shadowRoot.lastElementChild.insertAdjacentHTML('afterend', html);		
		thisEl.$id.input = thisEl._qs('input');
	}
} 

if(!customElements.get('kia-input')){
	customElements.define('kia-input', KIA_Input);	
}
 