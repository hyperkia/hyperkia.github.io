import '../../parsers/index.js';
import '../../utils/index.js';
import '../../actions/index.js';
import '../../services/index.js';
import '../../dom/index.js';
import '../../state/index.js';
import '../../observer/index.js';
import '../../managers/index.js';
import '../../registry/index.js';
 
import KIACustomElement from '../kia-custom-element/index.js';
import html from './html.js';

import * as Events from './events/index.js';
import methods from './utils/methods.js';
import props from './utils/props.js';

import "../kia-ui/index.js";

class KIA_App extends KIACustomElement {

    methods = methods;
    props = props;
    customizer = {styleHref: '/components/kia-app/style.css'};

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
        this.init();
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

    init() {
        window.addEventListener('load', () => {
            KIA.actions.kiaApp.appLoaded();
            document.body.classList.remove('loading');
            // console.log(KIA);
        });

        window.addEventListener('error', (e) => {
            console.log(e);
            alert('Console Error');
        })
    }
}

if (!customElements.get('kia-app')) {
    customElements.define('kia-app', KIA_App);
}