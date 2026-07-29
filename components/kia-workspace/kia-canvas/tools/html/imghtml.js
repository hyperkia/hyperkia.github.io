import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {

    static panning = false;
    static parentEl = null;
    static parentId = null;
    static imageEl = null;
    

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);
        this.panning = false;

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        this.parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(this.parentEl);
        this.parentId = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.imageEl = document.createElement('img');       
        this.imageEl.classList.add('canvas-layer');
        this.imageEl.setAttribute('data-layer', crypto.randomUUID());
        this.imageEl.setAttribute('draggable', false);
        this.imageEl.setAttribute('src', '');
        this.parentEl.append(this.imageEl);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
    } 

    static handlePointerMove(e) {        

        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if ((!this.imageEl)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
        
        const left = parseInt(Math.min(this.cpsdXY.x, this.cpsmXY.x))+'px';
        const top = parseInt(Math.min(this.cpsdXY.y, this.cpsmXY.y))+'px';
        const width = parseInt(Math.abs(this.cpsmXY.x - this.cpsdXY.x))+'px';
        const height = parseInt(Math.abs(this.cpsmXY.y - this.cpsdXY.y))+'px';
        
        Object.assign(this.imageEl.style, {left,top,width,height,});

        const id = this.imageEl.dataset.layer;

        KIA.actions.kiaCanvas.creatingElement({ 
            id,
            parent: this.parentId,
            tagName:this.imageEl.tagName,
            attributes: {
                src: '',
            },
            style: {
                width, height, left, top,
            },
            children: [],
            instanceof: 'html',
            stack: [],
        });
        
        if(!this.panning) {            
            const ids = new Set().add(id);
            KIA.actions.share.setSelectionIds(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;     

        if (props.isActualMove && this.parentEl) {
            const id = this.imageEl.dataset.layer;
            const imageElCss = KIA.utils.css.getElementCssProperty(this.imageEl, ['left','top','width','height']);
            const newLayerObj = {
                id,
                parent: this.parentId,
                tagName:this.imageEl.tagName,
                attributes: {
                    src: '',
                    loading: "lazy"
                },
                style: {                    
                    ...imageElCss,
                }, 
                children: [],
                instanceof: 'html',
                stack: [],
            };

            KIA.canvasRefMap[id] = this.imageEl;
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

            const keys = new Set().add(id);
            KIA.actions.share.setSelectionIds(keys);
        } else {
            this.imageEl?.remove();
        }   

        this.imageEl = null;
        this.parentEl = null;     
    }

    static handlePointerCancel(){
        this.imageEl?.remove();
        this.imageEl = null;
        this.panning = false;
        this.parentEl = null;
    }
}

export default Index;