import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';


class KIA_Right_Sidebar extends KIACustomElement {

    customizer = {styleHref: `/components/kia-workspace/kia-right-sidebar/style.css?v=${cacheVersion}`};

    constructor() {
        super();
        this.html = html;
        this.moduleURL = import.meta.url;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this._defaultSetup();
    }

}

if (!customElements.get('kia-right-sidebar')) {
    customElements.define('kia-right-sidebar', KIA_Right_Sidebar);
}