import KIACustomElement from '../../../kia-custom-element/index.js';
import html from './html.js';

import Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';


class KIA_Right_Sidebar_Body extends KIACustomElement {

    methods = methods;
    props = props;    
    customizer = {styleHref: `/components/kia-workspace/kia-right-sidebar/kia-right-sidebar-body/style.css?v=${cacheVersion}`};

    constructor() {
        super();
        this.html = html;
        this.moduleURL = import.meta.url;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this._defaultSetup();
        this.props.root = this;       
        this._eventsSetup(Events);  
    }

    handleEvents(e){
        Object.assign(props, props.root._resolveEventContext(e));      

        // Throttle
        if(['pointermove','input', 'scroll'].includes(e.type)) {
            if (Date.now() - this.lastThrottle < 30) return; 
            this.lastThrottle = Date.now();
            Events[e.type]?.handler?.(e);
            return;
        }

        // Debounce
        if(['keyup'].includes(e.type)) {            
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                Events[e.type]?.handler?.(e);
            }, 100);            
            return;
        }

        Events[e.type]?.handler?.(e);      
    } 

}

if (!customElements.get('kia-right-sidebar-body')) {
    customElements.define('kia-right-sidebar-body', KIA_Right_Sidebar_Body);
}