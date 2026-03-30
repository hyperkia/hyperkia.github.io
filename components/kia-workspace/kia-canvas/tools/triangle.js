
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    selectionLayers = null;

    // Events 
    static handlePointerDown(e) {
        this.eTarget = e.composedPath()[0];
        if(props.activeLayer?.matches('[contenteditable="true"]')) return;
        props.root.setPointerCapture(e.pointerId);        
        props.trianglePurpose = 'selection';
        if (props.activeLayer) props.trianglePurpose = 'moving';            
        if(this.eTarget.matches('.multi-selection-active')) {
            props.trianglePurpose = 'multiselection';
        } else {
            KIA.kiaCanvas.$id.canvasSelection.classList.remove('multi-selection-active');
        }

        if (props.trianglePurpose === 'moving') this.handlePointerDownTriangleMoveItem(e);
        if (props.trianglePurpose === 'selection') this.handlePointerDownTriangleSelection(e);
        if (props.trianglePurpose === 'multiselection') this.handlePointerDownMultiSelection(e);
    }

    static handlePointerMove(e) {
        if(props.activeLayer?.matches('[contenteditable="true"]')) return;
        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (props.trianglePurpose === 'moving') this.handlePointerMoveTriangleMoveItem(e);
        if (props.trianglePurpose === 'selection') this.handlePointerMoveTriangleSelection(e);
        if (props.trianglePurpose === 'multiselection') this.handlePointerMoveTriangleMultiSelection(e);
    }

    static handlePointerUp(e) {
        if(props.activeLayer?.matches('[contenteditable="true"]')) return;
        props.root.releasePointerCapture(e.pointerId);
        if (props.trianglePurpose === 'moving') this.handlePointerUpTriangleMoveItem();
        if (props.trianglePurpose === 'selection') this.handlePointerUpTriangleSelection(e);
        if (props.trianglePurpose === 'multiselection') this.handlePointerUpTriangleMultiSelection(e);
    }


    // Layer
    static handlePointerDownTriangleMoveItem(e) {        
        this.csdXY = KIA.dom.read.getCanvasScaleCoords({e});
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downTriangleMoveItem'});
    }

    static handlePointerMoveTriangleMoveItem(e) {
 
        this.csmXY = KIA.dom.read.getCanvasScaleCoords({e});
        const tX = Math.floor(this.csmXY.x - this.csdXY.x);
        const tY = Math.floor(this.csmXY.y - this.csdXY.y);
        props.activeLayer.style.translate = `${tX}px ${tY}px`;

        KIA.actions.kiaCanvas.movingLayer({             
            css: {
                left: parseInt(props.activeLayerCSS.left) + tX,
                top: parseInt(props.activeLayerCSS.top) + tY,
            },
            key: props.activeLayer.dataset.layer,
        });
    }

    static handlePointerUpTriangleMoveItem() {
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upTriangleMoveItem'});
        if (!props.isActualMove) return;
        const left = parseInt(props.activeLayerCSS.left) + (this.csmXY.x - this.csdXY.x) + 'px';
        const top  = parseInt(props.activeLayerCSS.top)  + (this.csmXY.y - this.csdXY.y) + 'px';
        Object.assign(props.activeLayer.style, { left, top, translate: 'none' });  
        KIA.actions.kiaCanvas.movingLayer({ 
            css: {left,top},
            key: props.activeLayer.dataset.layer,            
        });        
    }


    // selection
    static handlePointerDownTriangleSelection(e) {                
        this.cssdXY = KIA.dom.read.getCanvasScrollCoords({e});
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downTriangleSelection'});
        props.root.$id.canvasSelection.style = '';
    }

    static handlePointerMoveTriangleSelection(e) {
        this.cssmXY = KIA.dom.read.getCanvasScrollCoords({e});
        
        const cssObj = {
            left: Math.min(this.cssdXY.x, this.cssmXY.x),
            top: Math.min(this.cssdXY.y, this.cssmXY.y),
            width: Math.abs(this.cssmXY.x - this.cssdXY.x),
            height: Math.abs(this.cssmXY.y - this.cssdXY.y),
        }
        props.root.$id.canvasSelection.style = `left: ${cssObj.left}px;top: ${cssObj.top}px;width: ${cssObj.width}px;height:${cssObj.height}px;`;

        const selectedEls = KIA.dom.kiaCanvas.getElementsInMultiSelectionArea();
        KIA.actions.share.setSelectionKeys(selectedEls);
    } 

    static handlePointerUpTriangleSelection() {
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upTriangleSelection'});
        if (!props.isActualMove) return;
        const style = props.root.$id.canvasSelection.getAttribute('style');
        const selectedEls = KIA.dom.kiaCanvas.getElementsInMultiSelectionArea();
        KIA.actions.share.setSelectionKeys(selectedEls);
        KIA.dom.kiaCanvas.drawMultiElementsSelectionBound();
    }


    // Multi Selection
    static handlePointerDownMultiSelection(e) {

        this.cssdXY = KIA.dom.read.getCanvasScrollCoords({e});
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downMultiSelection'});
        this.selectionLayers = KIA.dom.read.getSelectionLayersElement();      
    }

    static handlePointerMoveTriangleMultiSelection(e) {

        this.cssmXY = KIA.dom.read.getCanvasScrollCoords({e});        

        const tX = Math.floor(this.cssmXY.x - this.cssdXY.x);
        const tY = Math.floor(this.cssmXY.y - this.cssdXY.y);
        KIA.kiaCanvas.$id.canvasSelection.style.translate = `${tX}px ${tY}px`;
        
        // Move Layers
        const layersObject = {layers: [], save: false};
        const x = ((tX * 1) / KIA.state.ui.canvasZoom);
        const y = ((tY * 1) / KIA.state.ui.canvasZoom);

        this.selectionLayers.forEach((el)=>{            
            el.style.translate = `${x}px ${y}px`;
            layersObject.layers.push({
                css: {left: 'Mixed',right: 'Mixed',},
                key: el.dataset.layer,
            });
        })
 
        KIA.actions.kiaCanvas.movingLayers(layersObject);
    }

    static handlePointerUpTriangleMultiSelection(e) {
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
            const key = el.dataset.layer;
            layersObject.layers.push({key,css:{left: elXY.left+'px', top: elXY.top+'px'}});            
        });

        KIA.actions.kiaCanvas.movingLayers(layersObject);
    }
    
}

export default Index;