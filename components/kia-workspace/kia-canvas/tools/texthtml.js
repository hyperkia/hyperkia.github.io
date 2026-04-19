import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    panning = false;
    parentEl = null;
    parentKey = null;
    textEl = null;

    static handlePointerDown(e) {

        props.root._qs('[contenteditable="true"]')?.removeAttribute('contenteditable');

        if(KIA.registry.tags.isText(props.eTarget.nodeName)) {
            props.eTarget.setAttribute('contenteditable', true);
            const ids = new Set().add(props.eTarget.dataset.layer);
            KIA.actions.share.setSelectionKeys(ids);
            return;
        }

        props.root.setPointerCapture(e.pointerId);
        this.panning = false;

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        if(!KIA.registry.tags.canHaveChildren(this.parentEl.nodeName)) {
            this.parentEl = this.parentEl.parentElement;
        }
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;

        this.textEl = document.createElement('p');       

        this.textEl.classList.add('canvas-layer', 'texthtml');        
        this.textEl.setAttribute('data-layer', crypto.randomUUID());
        this.textEl.setAttribute('draggable', false);
        this.parentEl.append(this.textEl);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
    }

    static handlePointerMove(e) {

        if (!props.root.hasPointerCapture(e.pointerId)) return false;
        if ((!this.textEl)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
        
        const left = parseInt(Math.min(this.cpsdXY.x, this.cpsmXY.x))+'px';
        const top = parseInt(Math.min(this.cpsdXY.y, this.cpsmXY.y))+'px';
        const width = parseInt(Math.abs(this.cpsmXY.x - this.cpsdXY.x))+'px';
        const height = parseInt(Math.abs(this.cpsmXY.y - this.cpsdXY.y))+'px';
        
        Object.assign(this.textEl.style, { left,top,width,height })

        const id = this.textEl.dataset.layer;
        KIA.actions.kiaCanvas.creatingElement({
            id,
            parent: this.parentKey,
            nodeName: this.textEl.nodeName,
            attributes: {},
            style: {
                width, height, left, top
            },
            children: [],
            instanceof: 'html',
            stack: [],
        });      
        
        if(!this.panning) {            
            const ids = new Set().add(id);
            KIA.actions.share.setSelectionKeys(ids);
            this.panning = true;
            KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downTextTool'});
        }
    }
 
    static handlePointerUp(e) {

        props.root.releasePointerCapture(e.pointerId);        
        this.panning = false; 

        if (props.isActualMove && this.parentEl) {
            const textElCss = KIA.utils.css.getElementCssProperty(this.textEl, ['left','top','width','height']);
            const id = this.textEl.dataset.layer;

            const newLayerObj = {
                id,
                parent: this.parentKey,
                nodeName: this.textEl.nodeName,
                attributes: {},                
                style: {                    
                    ...textElCss,
                    translate: 'none',                    
                },
                children: [],
                instanceof: 'html',
                stack: [],
            };   
        
            KIA.canvasRefMap[id] = this.textEl;            
            KIA.actions.kiaCanvas.createElement(newLayerObj);
            const ids = new Set().add(id);
            KIA.actions.share.setSelectionKeys(ids);
            this.textEl.setAttribute('contenteditable', true);
            this.textEl.focus();
        } else {
            this.textEl?.remove();
            this.textEl = null;
        }        
    }
}

export default Index;