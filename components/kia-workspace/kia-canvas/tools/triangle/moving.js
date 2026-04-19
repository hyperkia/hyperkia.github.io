
import props from '../../utils/props.js';

const Index = {

    activeLayer: null,
    activeLayerCss: null,
    newParent: null,

	event(e){
		this[e.type](e);
	},

	pointerdown(e) {        
        this.activeLayer = e.composedPath()[0];
        if(this.activeLayer.parentElement.nodeName === 'svg' && this.activeLayer.parentElement.childElementCount === 1) {
            this.activeLayer = this.activeLayer.parentElement;
        }
        this.activeLayerCss = window.getComputedStyle(this.activeLayer);
        this.csdXY = KIA.dom.read.getCanvasScaleCoords({e});
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downTriangleMoveItem'});
    },

    pointermove(e) {
        this.csmXY = KIA.dom.read.getCanvasScaleCoords({e});
        const tX = Math.floor(this.csmXY.x - this.csdXY.x);
        const tY = Math.floor(this.csmXY.y - this.csdXY.y);
        this.activeLayer.style.translate = `${tX}px ${tY}px`;

        this.activeIndicatorNewParent(e);

        KIA.actions.kiaCanvas.movingLayer({             
            style: {
                left: parseInt(this.activeLayerCss.left) + tX,
                top: parseInt(this.activeLayerCss.top) + tY,
            },
            id: this.activeLayer.dataset.layer,
        });
    },

    pointerup(e) {
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upTriangleMoveItem'});
        if (!props.isActualMove) return;
        const left = parseInt(this.activeLayerCss.left) + (this.csmXY.x - this.csdXY.x) + 'px';
        const top  = parseInt(this.activeLayerCss.top)  + (this.csmXY.y - this.csdXY.y) + 'px';
        Object.assign(this.activeLayer.style, { left, top, translate: 'none' });  
        KIA.actions.kiaCanvas.movingLayer({ 
            style: {left,top},
            id: this.activeLayer.dataset.layer,            
        });
        this.newParent?.classList.remove('new-parent-indicator');
        this.newParent && this.moveToNewParent(this.activeLayer, this.newParent);
    },

    activeIndicatorNewParent(e){
        const oldParentId = KIA.nodesMap[this.activeLayer.dataset.layer].parent;
        const oldParentEl = KIA.canvasRefMap[oldParentId];
        this.newParent?.classList.remove('new-parent-indicator');

        const pointEls = KIA.kiaCanvas.shadowRoot.elementsFromPoint(e.clientX, e.clientY);        
        this.newParent = null;

        for (const pe of pointEls) {
            if (pe === this.activeLayer) continue;
            if (KIA.registry.tags.canHaveChildren(pe.nodeName)) {
                this.newParent = pe;
                break;
            }
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

        KIA.actions.share.moveLayerInTree({
            dragTarget: child.dataset.layer,
            dropTarget: newParent.dataset.layer || newParent.dataset.page,
            position: 'inside',
            source: 'kiaCanvas',
        });

        KIA.actions.kiaCanvas.movingLayer({ 
            style: {
                left: left+'px',
                top: top+'px'
            },
            id: this.activeLayer.dataset.layer,            
        });
    }
}

export default Index;