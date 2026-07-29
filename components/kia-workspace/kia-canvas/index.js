import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';

// import methods from './utils/methods.js';
import props from './utils/props.js';
import * as Events from './events/index.js';
import * as regions from './regions/index.js';
import * as tools from './tools/index.js';


class KIA_Canvas extends KIACustomElement {

    // methods = methods;
    props = props;
    regions = regions;
    tools = tools;
    customizer = {styleHref: `/components/kia-workspace/kia-canvas/style.css?v=${cacheVersion}`};

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
        
        if(e.type === 'dblclick') props.eTarget = props.root.shadowRoot.elementFromPoint(e.clientX, e.clientY);         
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

    init(){
        props.root.scrollTop = 0;
        props.root.scrollLeft = 0;
        const ids = new Set().add('canvas');
        KIA.actions.share.setSelectionIds(ids);
    }

}

if (!customElements.get('kia-canvas')) {
    customElements.define('kia-canvas', KIA_Canvas);
}