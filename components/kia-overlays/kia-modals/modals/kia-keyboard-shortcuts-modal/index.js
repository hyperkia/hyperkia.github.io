import KIACustomElement from '../../../../kia-custom-element/index.js';
import html from './html.js';
import methods from './utils/methods.js';
import props from './utils/props.js';
import * as Events from './events/index.js';


class KIA_Keyboard_Shortcuts_Modal extends KIACustomElement {

    methods = methods;
    props = props;
    customizer = {styleHref: `/components/kia-overlays/kia-modals/modals/kia-keyboard-shortcuts-modal/style.css?v=${cacheVersion}`};

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

    open(){
        KIA.actions.ui.shortcutsKey.pushEscapeStack({
            close: props.root.close,
            id: 'kiaKeyboardShortcutsModal',
        });
    }

    close(){
        props.root.classList.remove('show');
    }

}

if (!customElements.get('kia-keyboard-shortcuts-modal')) {
    customElements.define('kia-keyboard-shortcuts-modal', KIA_Keyboard_Shortcuts_Modal);
}