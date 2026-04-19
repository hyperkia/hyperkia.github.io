import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';
import methods from './utils/methods.js';
import props from './utils/props.js';
import * as Events from './events/index.js';


class KIA_Popovers extends KIACustomElement {

    methods = methods;
    props = props;
    customizer = {styleHref: '/components/kia-overlays/kia-popovers/style.css'};

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

    openPopover(){
        this.classList.add('show');
        KIA[KIA.state.ui.getProp('openModal')].classList.add('show');
    }

    closePopover(){
        console.log(this);
        this.$class.modal.forEach( m => m.classList.remove('show'));        
        this.classList.remove('show');
    }

}

if (!customElements.get('kia-popovers')) {
    customElements.define('kia-popovers', KIA_Popovers);
}