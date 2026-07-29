import KIACustomElement from '../../../../kia-custom-element/index.js';
import html from './html.js';
import methods from './utils/methods.js';
import props from './utils/props.js';
import * as Events from './events/index.js';


class KIA_Missing_Fonts_Modal extends KIACustomElement {

    static get observedAttributes() {
        return ['class'];
    }

    methods = methods;
    props = props;
    customizer = {styleHref: `/components/kia-overlays/kia-modals/modals/kia-missing-fonts-modal/style.css?v=${cacheVersion}`};

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
        methods.init();
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

    open(){
        KIA.actions.ui.shortcutsKey.pushEscapeStack({
            close: props.root.close,
            id: 'kiaMissingFontsModal',
        });
    }

    close(){
        props.root.classList.remove('show');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(props.root && newValue.indexOf('show')>=0 ) methods.init();
    }

}

if (!customElements.get('kia-missing-fonts-modal')) {
    customElements.define('kia-missing-fonts-modal', KIA_Missing_Fonts_Modal);
}