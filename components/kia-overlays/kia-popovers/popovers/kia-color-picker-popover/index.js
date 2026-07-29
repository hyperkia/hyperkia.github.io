
import KIACustomElement from '../../../../kia-custom-element/index.js';
import html from './html.js';
import methods from './utils/methods.js';
import props from './utils/props.js';
import * as Events from './events/index.js';


class KIA_Color_Picker_Popover extends KIACustomElement{

    methods = methods;
    props = props;
    customizer = {styleHref: `/components/kia-overlays/kia-popovers/popovers/kia-color-picker-popover/style.css?v=${cacheVersion}`};

    constructor(){
        super();
        this.html = html;
        this.moduleURL = import.meta.url;
    }

    connectedCallback(){
        this.attachShadow({mode: 'open'});
        this._defaultSetup();
        this.props.root = this; 
        this._eventsSetup(Events);
    }    

    handleEvents(e){
        
        props.eTarget = e.composedPath()[0];        
         
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

    open() {
        props.root.classList.add('show');
        methods.uiStateColorPickerValueToUI();
        KIA.actions.ui.shortcutsKey.pushEscapeStack({
            close: this.close,
            id: 'kiaColorPickerPopover',
        });        
    }

    close(){
        props.root.classList.remove('show');
        if(!KIA.kiaPopovers._qs('.popover.show')) KIA.kiaPopovers.classList.remove('show');
    }
}

if(!customElements.get('kia-color-picker-popover')){
    customElements.define('kia-color-picker-popover',KIA_Color_Picker_Popover);   
}

