import KIACustomElement from '../../../../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';


class KIA_Left_Header extends KIACustomElement {

    methods = methods;
    props = props;
    customizer = {styleHref: `/components/kia-workspace/kia-left-sidebar/sections/kia-left-header/style.css?v=${cacheVersion}`};

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

    close(){
        props.root.$id.nav.classList.remove('show');
        const menuItems = props.root._qsAll('.menu-item.hover');
        menuItems.forEach(mi => mi.classList.remove('hover'));
    }

    appSelectionChange(event){
        if(event.detail.host?.dataset.event === 'toggleMenuVisibility') return;
        this.close();
    }

}

if (!customElements.get('kia-left-header')) {
    customElements.define('kia-left-header', KIA_Left_Header);
}