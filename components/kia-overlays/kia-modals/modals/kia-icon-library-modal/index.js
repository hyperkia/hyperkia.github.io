import KIACustomElement from '../../../../kia-custom-element/index.js';
import html from './html.js';
import methods from './utils/methods.js';
import props from './utils/props.js';
import * as Events from './events/index.js';


class KIA_Icon_Library_Modal extends KIACustomElement {

    methods = methods;
    props = props;
    customizer = {styleHref: `/components/kia-overlays/kia-modals/modals/kia-icon-library-modal/style.css?v=${cacheVersion}`};

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
        this.afterConnected();
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
            id: 'kiaIconLibraryModal',
        });
    }

    close(){
        KIA.kiaApp.dispatchEvent(new CustomEvent('iconLibraryIconSelected', {
            bubbles: true,
            composed: true,
            detail: { source: 'kiaIconLibrary', iconName: '' }
        }));
        props.root.classList.remove('show');
    }

    afterConnected(){
        methods.loadSvgIcons();  
    }

}

if (!customElements.get('kia-icon-library-modal')) {
    customElements.define('kia-icon-library-modal', KIA_Icon_Library_Modal);
}