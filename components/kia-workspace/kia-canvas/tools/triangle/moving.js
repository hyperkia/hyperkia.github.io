
import props from '../../utils/props.js';

const Index = {

    activeLayer: null,
    activeLayerId: '',
    activeLayerObj: '',
    activeLayerCss: null,
    newParent: null,
    is1stMove:false,
    pointer: {
        dX: 0,
        dY: 0,
        mX: 0,
        mY: 0,
    },
    historyItem: {},

    event(e){
        this[e.type]?.(e);
    },

    pointerdown(e) {
        this.is1stMove = false;
        this.activeLayer = KIA.dom.read.getTopSelectAbleLayerFromPoint(e);
        if(this.activeLayer.closest('svg')) {
            this.activeLayer = this.activeLayer.closest('svg');
        }        
        this.setActiveLayerData();
        this.csdXY = KIA.dom.read.getCanvasScaleCoords({e});
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downTriangleMoveItem'});
        this.oldParent = KIA.nodesMap[this.activeLayer.dataset.layer].parent;
        this.historyItem = {
            flag: 'moveSelectionInSameParent',
            selectionId: this.activeLayerId,
            undo: {
                selectionStyle: KIA.utils.css.getElementCssProperty(this.activeLayer, ['left','top']),                
            }
        }
    },

    pointermove(e) {
        if(!this.is1stMove) {        
            this.is1stMove = true;
            if(e.altKey) {
                e.preventDefault();
                const duplicateLayerId = KIA.actions.kiaLayers.duplicateLayer(this.activeLayer.dataset.layer);
                this.activeLayer = KIA.canvasRefMap[duplicateLayerId];
                this.setActiveLayerData();
            }
        }
        this.csmXY = KIA.dom.read.getCanvasScaleCoords({e});

        const tX = Math.floor(this.csmXY.x - this.csdXY.x);
        const tY = Math.floor(this.csmXY.y - this.csdXY.y);
        this.activeLayer.style.translate = `${tX}px ${tY}px`;

        this.activeIndicatorNewParent(e);

        KIA.actions.kiaCanvas.movingLayer({             
            style: {
                left: parseInt(this.activeLayerCss.left) + tX + 'px',
                top: parseInt(this.activeLayerCss.top) + tY + 'px',
            },
            id: this.activeLayer.dataset.layer,
            source: 'kiaCanvas',
        });
    },

    pointerup(e) {
        this.is1stMove = false;
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upTriangleMoveItem'});

        if (!props.isActualMove) return;
        
        const id = this.activeLayer.dataset.layer;
        const left = parseInt(this.activeLayerCss.left) + (this.csmXY.x - this.csdXY.x) + 'px';
        const top  = parseInt(this.activeLayerCss.top)  + (this.csmXY.y - this.csdXY.y) + 'px';
        Object.assign(this.activeLayer.style, { left, top, translate: 'none' });  
        KIA.actions.kiaCanvas.movingLayer({ 
            style: {left,top},
            id,
        });

        this.historyItem.redo = {
            selectionStyle: KIA.utils.css.getElementCssProperty(this.activeLayer, ['left','top']),
        }

        const oldParentObj = structuredClone(KIA.nodesMap[this.activeLayerObj.parent]);
        if(this.newParent) {
            this.historyItem.undo.oldParentObj = structuredClone(oldParentObj);            
        }
        this.newParent && this.moveToNewParent(this.activeLayer, this.newParent);
        this.newParent?.classList.remove('new-parent-indicator');
        if(this.newParent) {
            this.historyItem.flag = 'moveSelectionInDiffParent';
            const newParentId = this.newParent.dataset.layer || this.newParent.dataset.page;                        
            this.historyItem.redo = {
                selectionStyle: KIA.utils.css.getElementCssProperty(this.activeLayer, ['left','top']),
                newParentObj: structuredClone(KIA.nodesMap[newParentId]),
                oldParentObj: structuredClone(oldParentObj),
            };
            this.historyItem.undo.newParentObj = structuredClone(KIA.nodesMap[newParentId]);
        }
        KIA.actions.ui.history.addItem(this.historyItem);
    },

    pointercancel(){
        this.is1stMove = false;
    },

    activeIndicatorNewParent(e){
        const oldParentId = KIA.nodesMap[this.activeLayer.dataset.layer].parent;
        const oldParentEl = KIA.canvasRefMap[oldParentId];
        this.newParent?.classList.remove('new-parent-indicator');

        const ignoreSelectors = ['.page-name','.pages','.resize-controller-point'];
        let pointEls = KIA.kiaCanvas.shadowRoot.elementsFromPoint(e.clientX, e.clientY);
        let parentAbleEl = null;
        pointEls.forEach((pEl)=>{
            if(parentAbleEl) return;
            if(pEl.matches('.canvas-layer') && pEl!==this.activeLayer) parentAbleEl = pEl;
            if(pEl.matches('.page')) parentAbleEl = pEl;
        });        
        
        let i = 0;
        this.newParent = null;        
        while(parentAbleEl) {
            if(i > 500) break;
            i++;
            if (ignoreSelectors.some(sel => parentAbleEl.matches(sel))) {
                parentAbleEl = parentAbleEl.parentElement;
                continue;
            }
            if (parentAbleEl === this.activeLayer) continue;
            if (KIA.registry.tags.canHaveChildren(parentAbleEl.tagName)) {
                this.newParent = parentAbleEl;
                break;
            }
            parentAbleEl = parentAbleEl.parentElement;
        }

        if(this.newParent === oldParentEl) {
            this.newParent = null;
            return;
        }

        this.newParent?.classList.add('new-parent-indicator');
    },

    moveToNewParent(child, newParent) {
        const scale = KIA.state.ui.getProp('canvasZoom') || 1;
        const rect = child.getBoundingClientRect();

        newParent.appendChild(child);

        const parentRect = newParent.getBoundingClientRect();
        const top  = (rect.top  - parentRect.top)  / scale;
        const left = (rect.left - parentRect.left) / scale;

        child.style.top  = KIA.utils.number.cleanNumber(top) + 'px';
        child.style.left = KIA.utils.number.cleanNumber(left) + 'px';

        const id = this.activeLayer.dataset.layer;
        
        KIA.actions.share.moveLayerInTree({
            dragTarget: child.dataset.layer,
            dropTarget: newParent.dataset.layer || newParent.dataset.page,
            position: 'inside',
            source: 'kiaCanvas',
        });

        KIA.actions.kiaCanvas.movingLayer({ 
            id,
            style: {
                left: left+'px',
                top: top+'px'
            },
        });
    },

    setActiveLayerData(){
        this.activeLayerId = this.activeLayer.dataset.layer;
        this.activeLayerObj = KIA.nodesMap[this.activeLayerId]
        this.activeLayerCss = window.getComputedStyle(this.activeLayer);
    }
}

export default Index;