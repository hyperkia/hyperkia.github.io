
class KIACustomElement extends HTMLElement{

	_defaultSetup(){
		this._setComponentHTMLCSS();
		this._storeElements();
		const tagName = KIA.utils.string.underScoreToCamelCase(this.tagName.replace('WBTR-','').toLowerCase());
		KIA[tagName] = this;			
		this.cryptoId = crypto.randomUUID();
	}

	_setComponentHTMLCSS(){
		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="/components/kia-custom-element/style.css">
			<link rel="stylesheet" href="${this.customizer?.styleHref}">
			${this.html}
		`;		
	}

	_storeElements(){		
		this.$id = {};
		this._qsAll('[data-id]').forEach((el)=>{			
			this.$id[KIA.utils.string.underScoreToCamelCase(el.dataset.id)] = el;
		})

		this.$class = {};
		this._qsAll('[data-class]').forEach((el)=>{			
			this.$class[KIA.utils.string.underScoreToCamelCase(el.dataset.class)] = this._qsAll(`[data-class="${el.dataset.class}"]`);
		})
	}

	_eventsSetup(Events) {
		for(const event in Events) {			
			if(['pointerover','pointerout','transitionstart','transitionend','change','input','click'].includes(event)) {
				this.shadowRoot.addEventListener(event, this.handleEvents);
			} else if (['toggle',].includes(event)) {
				this.shadowRoot.addEventListener(event, this.handleEvents, true);
			} else {
				this.addEventListener(event, this.handleEvents);
			}
		}		
	}
 
	_qs(selector){
		return this.shadowRoot.querySelector(selector);
	}

	_qsAll(selector){
		return this.shadowRoot.querySelectorAll(selector);
	}

	_emitEvent(eventName){		
		KIA.kiaApp.dispatchEvent(new CustomEvent(eventName, {
		  bubbles: true,
		  composed: true,
		  detail: { source: this.cryptoId}
		})); 
	}

	_removeClass(selector,className){
		const els = this.shadowRoot.querySelectorAll(selector);
		els.forEach((el)=>{
			el.classList.remove(className);
		})
	}

	_resolveEventContext(e){
		const obj = {};
		obj.eTarget = e.composedPath()[0];
		if(obj.eTarget.getRootNode().host) obj.eRTarget = obj.eTarget.getRootNode().host;
		obj.eTAction = obj.eTarget.dataset.event || null;
		obj.eRTAction = obj.eRTarget?.dataset.event || null;
		return obj;
	}
}

export default KIACustomElement;