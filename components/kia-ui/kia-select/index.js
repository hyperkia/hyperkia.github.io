import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';

class KIA_Select extends KIACustomElement{

	detailsEl = null;
	methods = methods;
	props = props;
	customizer = {styleHref: `/components/kia-ui/kia-select/style.css?v=${cacheVersion}`};

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

	set value(valu){
		methods.selectedValueOption(this, valu);
	}

	get selectedOption(){		
		return this._qs('.select-option.selected');
	}

	appSelectionChange(event){
		if(!props.currentOpenedDropdown) return;
		if(event.detail.host.tagName === 'KIA-SELECT') return;		
		methods.close();
	}
}

if(!customElements.get('kia-select')){
	customElements.define('kia-select',KIA_Select);	
}
