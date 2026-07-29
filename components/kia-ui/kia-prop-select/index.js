import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';

class KIA_Prop_Select extends KIACustomElement{

	detailsEl = null;
	methods = methods;
	props = props;
	customizer = {styleHref: `/components/kia-ui/kia-prop-select/style.css?v=${cacheVersion}`};

	constructor(){
		super();
		this.html = html;
		this.moduleURL = import.meta.url;
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});
		this._defaultSetup();
		methods.markupSetup(this);
		this.events();		
	}	
 
	updateHTML(html){		
		this.$id.details.replaceChildren();
		this.$id.details.innerHTML = html;
	}

	events(){
		this.shadowRoot.addEventListener('click', this.handleEvents);
	}

	handleEvents(e){
		props.eTarget = e.composedPath()[0];	
		props.eRootNode = props.eTarget.getRootNode().host;	
		if(e.type == 'click') Events.click.handler(e);
	}

	get value(){
		return this.getAttribute('value');
	}

	set value(value){		
		methods.selectedValueOption(this, value);
	}

	get selectedOption(){		
		return this._qs('.select-option.selected');
	}

	appSelectionChange(event){
		if(!props.currentOpenedDropdown) return;
		if(event.detail.host.tagName === 'KIA-PROP-SELECT') return;
		methods.close();
	}

}

if(!customElements.get('kia-prop-select')){
	customElements.define('kia-prop-select',KIA_Prop_Select);	
}
