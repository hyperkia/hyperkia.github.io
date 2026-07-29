import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';

class KIA_Prop_Input extends KIACustomElement {

	methods = methods;
	props = props;
	customizer = {styleHref: `/components/kia-ui/kia-prop-input/style.css?v=${cacheVersion}`};

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
		props.root = e.target.matches('kia-prop-input') ? e.target : e.target.getRootNode().host;
		if(!props.root) return;
		if (Date.now() - this.lastThrottle < 50) return;		
		Object.assign(props, props.root._resolveEventContext(e));
        this.lastThrottle = Date.now();
        Events[e.type]?.handler?.(e);
	}

	get value() {
		return this.$id.input.value;
	}


	set value(value) {		
		this.$id.input.value = value;
		this.dispatchEvent(new CustomEvent('kiaPropInput', {
		  bubbles: true,
		  composed: true,
		  detail: { source: this}
		}));	
	}

	get type() {
		return this.$id.input.type;
	}

	set type(valu) {
		this.$id.input.type = valu;
	}

	focus(){
		this.$id.input.focus();
	}
} 

if(!customElements.get('kia-prop-input')){
	customElements.define('kia-prop-input', KIA_Prop_Input);	
}
 