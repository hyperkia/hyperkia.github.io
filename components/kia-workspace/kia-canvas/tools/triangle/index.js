
import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

import moving from './moving.js';
import resize from './resize.js';
import selection from './selection.js';
import multiselection from './multiselection.js';

class Index {

    selectionLayers = null;
    activeLayer = null;
    purpose = '';

    static handlePointerDown(e) {
        const eTarget = e.composedPath()[0];
        this.activeLayer = KIA.dom.read.getTopSelectAbleLayerFromPoint(e);
        if(this.activeLayer?.matches('[contenteditable="true"]')) return;
        const isResize = eTarget.matches('.resize-controller-point');
        const isMultiSelection = eTarget.matches('.resize-controller-point');
        props.root.setPointerCapture(e.pointerId);

        this.purpose = 'selection';
        if (this.activeLayer && !isResize && !isMultiSelection) {
            this.purpose = 'moving';
        } else if(isResize) {
            this.purpose = 'resize';
        } else if(isMultiSelection) {
            this.purpose = 'multiselection';
        } else {
            KIA.kiaCanvas.$id.canvasSelection.classList.remove('multi-selection-active');
        }
        
        if (this.purpose === 'moving') moving.event(e);
        if (this.purpose === 'resize') resize.event(e);
        // if (this.purpose === 'selection') selection.event(e);
        // if (this.purpose === 'multiselection') multiselection.event(e);
    }

    static handlePointerMove(e) {
        if(this.activeLayer?.matches('[contenteditable="true"]')) return;
        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (this.purpose === 'moving') moving.event(e);
        if (this.purpose === 'resize') resize.event(e);
        // if (this.purpose === 'selection') selection.event(e);
        // if (this.purpose === 'multiselection') multiselection.event(e);
    }

    static handlePointerUp(e) {
        if(this.activeLayer?.matches('[contenteditable="true"]')) return;
        props.root.releasePointerCapture(e.pointerId);
        if (this.purpose === 'moving') moving.event(e);
        if (this.purpose === 'resize') resize.event(e);
        // if (this.purpose === 'selection') selection.event(e);
        // if (this.purpose === 'multiselection') multiselection.event(e);
    }

    static handlePointerCancel(){
        props.root.releasePointerCapture(e.pointerId);
        if (this.purpose === 'moving') moving.event(e);
        if (this.purpose === 'resize') resize.event(e);
        // if (this.purpose === 'selection') selection.event(e);
        // if (this.purpose === 'multiselection') multiselection.event(e);
    }

}

export default Index;