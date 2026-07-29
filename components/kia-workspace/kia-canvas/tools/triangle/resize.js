
import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

const Index = {

    resizeRect: null,
    direction: '',
    canvasRect: null,
    selectionId: '',
    selectionObj: '',
    activeLayer: null,
    activeLayerFinalRect: null,
    canvasScale: 1,
    historyItem: null,

	event(e){
		this[e.type](e);
	},

	pointerdown(e) {
        const selectionId = KIA.state.ui.getSelectionId();
        this.selectionId = KIA.dom.read.getClosestHtmlKindIdById(selectionId);
        this.selectionObj = KIA.nodesMap[this.selectionId];
        this.activeLayer = KIA.canvasRefMap[this.selectionId];
        if(!this.activeLayer) return;
        this.direction = props.eTarget.dataset.direction;
        const activeLayerRect = this.activeLayer.getBoundingClientRect();
        this.resizeRect = {
            top: activeLayerRect.top,
            left: activeLayerRect.left,
            bottom: activeLayerRect.bottom,
            right: activeLayerRect.right,
        };
        this.canvasRect = KIA.kiaCanvas.getBoundingClientRect();
        this.canvasScale = KIA.state.ui.getProp('canvasZoom');

        this.historyItem = {
            flag: 'style',
            selectionId: this.selectionId,
            undo: {
                selectionStyle: {
                    left: this.selectionObj.style.left,
                    top: this.selectionObj.style.top,
                    width: this.selectionObj.style.width,
                    height: this.selectionObj.style.height,
                }
            }
        }
    },

    pointermove(e) { 
        if(!this.resizeRect) return;

        switch(this.direction) {
            case 'top':
                this.resizeRect.top = e.clientY;
                break;
            case 'right':
                this.resizeRect.right = e.clientX;
                break;
            case 'bottom':
                this.resizeRect.bottom = e.clientY;
                break;
            case 'left':
                this.resizeRect.left = e.clientX;
                break;            
        }

        const left = Math.min(this.resizeRect.left, this.resizeRect.right);
        const top = Math.min(this.resizeRect.top, this.resizeRect.bottom);
        const width = Math.abs(this.resizeRect.left - this.resizeRect.right);
        const height = Math.abs(this.resizeRect.top - this.resizeRect.bottom);

        KIA.kiaCanvas.$id.resizeController.style.cssText = `
            left: ${left+KIA.kiaCanvas.scrollLeft - this.canvasRect.left - KIA.kiaCanvas.clientLeft}px;
            top: ${top+KIA.kiaCanvas.scrollTop - this.canvasRect.top - KIA.kiaCanvas.clientTop}px;
            width: ${width}px;
            height: ${height}px;
            opacity: 1;
        `;

        const positionXY = KIA.dom.read.getCanvasElementScaleCoords({e:{clientX: left, clientY: top}, element : this.activeLayer.parentElement});
        const layerCss = {
            left: positionXY.x+'px',
            top: positionXY.y+'px',
            width: (width/this.canvasScale)+'px',
            height: (height/this.canvasScale)+'px',
        }
        Object.assign(this.activeLayer.style, layerCss);

        
        const newLayerObj = {
            id: this.selectionId,
            style: layerCss,            
        };
        KIA.actions.kiaCanvas.resizeLayer(newLayerObj);
        this.activeLayerFinalRect = layerCss;
    },

    pointerup() {
        if(!this.activeLayerFinalRect) return;

        const newLayerObj = {
            id: this.selectionId,
            style: this.activeLayerFinalRect,
        };
        KIA.actions.kiaCanvas.resizeLayer(newLayerObj);

        this.historyItem.redo = {
            selectionStyle: structuredClone(this.activeLayerFinalRect),
        }
        KIA.actions.ui.history.addItem(this.historyItem);

        this.activeLayerFinalRect = null;
        this.resizeRect = null;
    },

    pointercancel(){
        this.activeLayerFinalRect = null;
        this.resizeRect = null;
    },
}

export default Index;