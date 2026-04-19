import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    panning = false;
    parentEl = null;
    parentKey = null;
    sectionEl = null;

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);
        this.panning = false;

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        if(!KIA.registry.tags.canHaveChildren(this.parentEl.nodeName)) {
            this.parentEl = this.parentEl.parentElement;
        }
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.sectionEl = document.createElement('section');       

        this.sectionEl.classList.add('canvas-layer');
        this.sectionEl.setAttribute('data-layer', crypto.randomUUID());
        this.sectionEl.setAttribute('draggable', false);
        this.sectionEl.style.backgroundColor = '#d9d9d9';
        this.parentEl.append(this.sectionEl);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
    } 

    static handlePointerMove(e) {        

        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if ((!this.sectionEl)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
        
        const left = parseInt(Math.min(this.cpsdXY.x, this.cpsmXY.x))+'px';
        const top = parseInt(Math.min(this.cpsdXY.y, this.cpsmXY.y))+'px';
        const width = parseInt(Math.abs(this.cpsmXY.x - this.cpsdXY.x))+'px';
        const height = parseInt(Math.abs(this.cpsmXY.y - this.cpsdXY.y))+'px';
        
        Object.assign(this.sectionEl.style, {left,top,width,height,});

        const id = this.sectionEl.dataset.layer;

        KIA.actions.kiaCanvas.creatingElement({ 
            id,
            parent: this.parentKey,
            nodeName: this.sectionEl.nodeName,
            attributes: {},
            style: {
                width, height, left, top,
                'background-color': '#d9d9d9',                
            },
            children: [],
            instanceof: 'html',
            stack: [],
        });
        
        if(!this.panning) {            
            const ids = new Set().add(id);
            KIA.actions.share.setSelectionKeys(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;     

        if (props.isActualMove && this.parentEl) {
            const id = this.sectionEl.dataset.layer;
            const secElCss = KIA.utils.css.getElementCssProperty(this.sectionEl, ['left','top','width','height']);
            const newLayerObj = {
                id,
                parent: this.parentKey,
                nodeName: this.sectionEl.nodeName,
                attributes: {},
                style: {
                    ...secElCss,
                    translate: 'none',
                    'background-color': '#d9d9d9',
                }, 
                children: [],
                instanceof: 'html',
                stack: [],
            };
            KIA.canvasRefMap[id] = this.sectionEl;
            KIA.actions.kiaCanvas.createElement(newLayerObj);
            const keys = new Set().add(id);
            KIA.actions.share.setSelectionKeys(keys);
        } else {
            this.sectionEl?.remove();
            this.sectionEl = null;
        }        
    }
}

export default Index;