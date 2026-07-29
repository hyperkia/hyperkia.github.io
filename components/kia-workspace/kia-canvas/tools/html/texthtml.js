import props from '../../utils/props.js';
import methods from '../../utils/methods.js'; 

class Index {

    static panning = false;
    static parentEl = null;
    static parentKey = null;
    static textEl = null;
    

    static handlePointerDown(e) {
        const isTextLayer = methods.editTextLayerById(props.eTarget.dataset.layer);
        if(isTextLayer) return;

        props.root.setPointerCapture(e.pointerId);
        this.panning = false;


        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        this.parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(this.parentEl);
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;

        this.textEl = document.createElement('p');       

        this.textEl.classList.add('canvas-layer', 'texthtml');
        this.textEl.setAttribute('data-layer', crypto.randomUUID());
        this.textEl.setAttribute('draggable', false);
        this.textEl.setAttribute('spellcheck', false);
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
            tagName:this.textEl.tagName,
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
            KIA.actions.share.setSelectionIds(ids);
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
                tagName:this.textEl.tagName,
                attributes: {
                    spellcheck: false,
                },                
                style: {                    
                    ...textElCss,
                },
                children: [],
                instanceof: 'html',
                stack: [],
            };   
        
            KIA.canvasRefMap[id] = this.textEl;            
            KIA.actions.kiaCanvas.createElement(newLayerObj);

            KIA.actions.ui.history.addItem({
                flag: 'createElementHTML',
                selectionId: id,
                undo: {
                    parentId: this.parentId,
                },
                redo: {                    
                    newElementObj: structuredClone(newLayerObj),
                }                
            });
            
            const ids = new Set().add(id);
            KIA.actions.share.setSelectionIds(ids);
            this.textEl.setAttribute('contenteditable', true);
            this.textEl.focus();
            this.textEl.classList.remove('texthtml');
        } else {
            this.textEl?.remove();
        }

        this.textEl = null;
        this.parentEl = null;
    }

    static handlePointerCancel(){
        this.textEl?.remove();
        this.textEl = null;
        this.panning = false;
        this.parentEl = null;
    }
}

export default Index;