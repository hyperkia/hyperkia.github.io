import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';

class KIA_Prop_Radios extends KIACustomElement{

	methods = methods;
	props = props;
	customizer = {styleHref: `/components/kia-ui/kia-prop-radios/style.css?v=${cacheVersion}`};

	constructor(){
		super();
		this.html = html[this.dataset.html];
		this.moduleURL = import.meta.url;
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});		
		this._defaultSetup();
		this._eventsSetup(Events);
	}

	handleEvents(e){				
		props.eTarget = e.composedPath()[0];
		props.eRootNode = props.eTarget.getRootNode().host;        
        Events[e.type]?.handler?.(e);
	}
} 

if(!customElements.get('kia-prop-radios')){
	customElements.define('kia-prop-radios',KIA_Prop_Radios);	
}
 