
import props from '../utils/props.js';
import shortcuts from '../../../shortcuts/index.js';
import unitTest from '../../../unitTest/index.js';

const Methods = {

    lastThrottle: Date.now(),
    channel: new BroadcastChannel("hyperkia"),

    windowEvents() {
        window.addEventListener('DOMContentLoaded', (e) => {
            KIA.actions.runtime.updateRuntime({ startedAt: Date.now() });            
        });

        window.addEventListener('error', (e) => {
            console.log(e);
            if (window.location.href.indexOf('localhost') >= 0) {
                alert(e);
                localStorage.setItem(Date.now(), e.message);
            }
        });

        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
            KIA.actions.runtime.updateRuntime({ finishedAt: Date.now() });

            const appLoad = () => {
                KIA.actions.kiaApp.appLoaded();
                // if (window.location.href.indexOf('localhost') >= 0) unitTest();
            };

            if ('requestIdleCallback' in window) {
                requestIdleCallback(appLoad);
            } else {
                setTimeout(appLoad, 0);
            }
        });

        window.addEventListener('blur', () => {
            KIA.actions.ui.miscellaneous.setActivePressedkeyCode(null);
        });
    },

    documentEvents() {
        const keys = KIA.state.config.getProp('supportShortcutKeys');
        const ctrlKeys = KIA.state.config.getProp('supportShortcutCtrlKeys');
        const shiftKeys = KIA.state.config.getProp('supportShortcutShiftKeys');
        const ctrlshiftKeys = KIA.state.config.getProp('supportShortcutCtrlShiftKeys');
        const skipRepeatctrlKeys = KIA.state.config.getProp('skipRepeatShortcutCtrlKeys');

        document.addEventListener('keydown', (e) => {
            if(e.key === "F5" && window.location.href.indexOf('localhost') >= 0) e.preventDefault();

            const isTyping = KIA.utils.dom.isTypingTarget(e);
            if (isTyping) return;

            const code = e.code.toLowerCase();

            const isPlain = keys.has(code) && !e.ctrlKey && !e.shiftKey && !e.altKey;
            const isCtrl = ctrlKeys.has(code) && e.ctrlKey && !e.shiftKey && !e.altKey;
            const isShift = shiftKeys.has(code) && !e.ctrlKey && e.shiftKey && !e.altKey;
            const isCtrlShift = ctrlshiftKeys.has(code) && e.ctrlKey && e.shiftKey && !e.altKey;
            if (isPlain || isCtrl || isShift || isCtrlShift) e.preventDefault();

            if (!e.repeat) {
                KIA.actions.ui.miscellaneous.setActivePressedkeyCode(code);                
                KIA.kiaApp.dispatchEvent(new CustomEvent('changePressedKey', {
                    bubbles: true,
                    composed: true,
                    detail: { keyCode: code, source: 'document' }
                }));
            }
        
            const isSkipRepeatCtrl = skipRepeatctrlKeys.has(code) && e.ctrlKey && !e.shiftKey && !e.altKey;
            if(isSkipRepeatCtrl && e.repeat) {
                e.preventDefault();            
                return;
            }

            shortcuts(e);
        });

        document.addEventListener('keyup', (e) => {
            if (Date.now() - this.lastThrottle < 30) return; 
            this.lastThrottle = Date.now();

            KIA.actions.ui.miscellaneous.setActivePressedkeyCode(null);
            KIA.kiaApp.dispatchEvent(new CustomEvent('changePressedKey', {
                    bubbles: true,
                    composed: true,
                    detail: { keyCode: '', source: 'document' }
                }));
        });

        document.addEventListener('click', (e)=>{         
            let tEl = e.composedPath()[0];
            if(tEl.tagName.indexOf('KIA-') === 0) {
                const tElRect = tEl.getBoundingClientRect();
                tEl = tEl.shadowRoot.elementFromPoint(e.clientX-tElRect.x, e.clientY-tElRect.y) || tEl;
            }
            
            KIA.kiaApp.dispatchEvent(new CustomEvent('appSelectionChange', {
              bubbles: true,
              composed: true,
              detail: { 
                target: tEl,
                host: tEl.getRootNode?.().host,
              }
            }));
        });

        document.addEventListener("visibilitychange", () => {
            const pageHTML = {};
            [...KIA.kiaCanvas.$id.pages.children].forEach((pEl)=>{
                pageHTML[pEl.dataset.page] = pEl.outerHTML;
            });
            const data = {
                pagesObject: KIA.state.pages.getPages(),
                pageHTML,
                style: KIA.kiaCanvas.$id.style.textContent,
                projectFontsStyle: KIA.kiaCssTypography.$id.importFontsStyleEl.innerHTML,
            }
            if (document.visibilityState === "hidden") {
                this.channel.postMessage(data);
            }

            this.channel.onmessage = (e) => {               
                if (e.data.type === "request-preview") {
                    this.channel.postMessage(data);
                }
            };  
        });
    },

};

export default Methods;