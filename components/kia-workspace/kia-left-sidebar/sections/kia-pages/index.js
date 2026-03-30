import KIACustomElement from '../../../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';


class KIA_Pages extends KIACustomElement {

    methods = methods;
    props = props;
    customizer = {styleHref: '/components/kia-workspace/kia-left-sidebar/sections/kia-pages/style.css'};

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
        props.eTarget = e.composedPath()[0];
        props.eTargetRoot = props.eTarget.getRootNode().host;        
        props.eTEvent = props.eTarget.dataset.event;
        props.eTREvent = props.eTargetRoot.dataset.event;
        props.pageEl = props.eTarget.closest('[data-page]');
        props.pageKey = props.pageEl?.dataset.page;
    

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

if (!customElements.get('kia-pages')) {
    customElements.define('kia-pages', KIA_Pages);
}