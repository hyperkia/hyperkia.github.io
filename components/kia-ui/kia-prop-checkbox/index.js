import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';

class KIA_Prop_Checkbox extends KIACustomElement{

	methods = methods;
	props = props;
	customizer = {styleHref: '/components/kia-ui/kia-prop-checkbox/style.css'};

	constructor(){
		super();
		this.html = html;
		this.moduleURL = import.meta.url;
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});
		this._defaultSetup();
		this.methods.markupSetup(this);		
		this._eventsSetup(Events);
	}

	handleEvents(e){
		props.eTarget = e.composedPath()[0];
		props.eRTarget = props.eTarget.getRootNode().host;
        Events[e.type]?.handler?.(e);
	}

	set value(value) {
		this.$id.input.checked = value;
		this.dispatchEvent(new CustomEvent('kiaPropCheckbox', {
		  bubbles: true,
		  composed: true,
		  detail: { source: this}
		}));	
	}

} 

if(!customElements.get('kia-prop-checkbox')){
	customElements.define('kia-prop-checkbox', KIA_Prop_Checkbox);	
}
 