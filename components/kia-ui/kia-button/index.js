import KIACustomElement from '../../kia-custom-element/index.js';
import html from './html.js';
 

class KIA_Button extends KIACustomElement {

    customizer = {styleHref: `/components/kia-ui/kia-button/style.css?v=${cacheVersion}`};

    constructor() {
        super();
        this.html = html;
        this.moduleURL = import.meta.url;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this._defaultSetup();

        const ds = this.dataset;
        const buttonEl = this._qs('button');
        let html = '';
        if(ds.title) html += `<span part="button-title">${ds.title}</span>`;
        if(ds.icon) html += `
            <svg part="svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#${ds.icon}"></use></svg>
        `;
        buttonEl.innerHTML = html;
    }

}

if (!customElements.get('kia-button')) {
    customElements.define('kia-button', KIA_Button);
}