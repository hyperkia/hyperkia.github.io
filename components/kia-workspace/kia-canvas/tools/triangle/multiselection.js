
import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

const Index = {

    pointer: {
        dX: 0,
        dY: 0,
        mX: 0,
        mY: 0,
    },

	event(e){
		this[e.type](e);
	},

	pointerdown(e) {

        this.cssdXY = KIA.dom.read.getCanvasScrollCoords({e});
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downMultiSelection'});
        this.selectionLayers = KIA.dom.read.getSelectionLayersElement();      
    },

    pointermove(e) {
        
        this.cssmXY = KIA.dom.read.getCanvasScrollCoords({e});        

        const tX = Math.floor(this.cssmXY.x - this.cssdXY.x);
        const tY = Math.floor(this.cssmXY.y - this.cssdXY.y);
        KIA.kiaCanvas.$id.canvasSelection.style.translate = `${tX}px ${tY}px`;
        
        // Move Layers
        const layersObject = {layers: [], save: false};
        const x = ((tX * 1) / KIA.state.ui.getProp('canvasZoom'));
        const y = ((tY * 1) / KIA.state.ui.getProp('canvasZoom'));

        this.selectionLayers.forEach((el)=>{            
            el.style.translate = `${x}px ${y}px`;
            layersObject.layers.push({
                style: {left: 'Mixed',right: 'Mixed',},
                id: el.dataset.layer,
            });
        })
 
        KIA.actions.kiaCanvas.movingLayers(layersObject);
    },

    pointerup(e) {
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upMultiSelection'});
        
        if (!props.isActualMove) return;

        // selection
        const canvasSelectionEl = KIA.kiaCanvas.$id.canvasSelection;
        const canvasSelectionElXY = KIA.dom.read.getPositionRelativeToCanvas(canvasSelectionEl);
        canvasSelectionEl.style.left = canvasSelectionElXY.left-2+'px';
        canvasSelectionEl.style.top = canvasSelectionElXY.top+'px';
        canvasSelectionEl.style.translate = 'none';

        // layers
        const layersObject = {layers: [], save: true};
        this.selectionLayers.forEach((el)=>{
            const elXY = KIA.dom.read.getElementPositionInScaledCanvasPage({element: el, pageEl: el.closest('[data-page]')});
            Object.assign(el.style, { left: elXY.left, top: elXY.top, translate: 'none' });
            el.style.left = elXY.left+'px';
            el.style.top = elXY.top+'px';
            el.style.translate = 'none';
            const id = el.dataset.layer;
            layersObject.layers.push({id,style:{left: elXY.left+'px', top: elXY.top+'px'}});            
        });

        KIA.actions.kiaCanvas.movingLayers(layersObject);
    },

    pointercancel(){},
}

export default Index;