
import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

import moving from './moving.js';
import selection from './selection.js';
import multiselection from './multiselection.js';

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

        if (props.trianglePurpose === 'moving') moving.event(e);
        if (props.trianglePurpose === 'selection') selection.event(e);
        // if (props.trianglePurpose === 'multiselection') multiselection.event(e);
    }

    static handlePointerMove(e) {
        if(props.activeLayer?.matches('[contenteditable="true"]')) return;
        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (props.trianglePurpose === 'moving') moving.event(e);
        if (props.trianglePurpose === 'selection') selection.event(e);
        // if (props.trianglePurpose === 'multiselection') multiselection.event(e);
    }

    static handlePointerUp(e) {
        if(props.activeLayer?.matches('[contenteditable="true"]')) return;
        props.root.releasePointerCapture(e.pointerId);
        if (props.trianglePurpose === 'moving') moving.event(e);
        if (props.trianglePurpose === 'selection') selection.event(e);
        // if (props.trianglePurpose === 'multiselection') multiselection.event(e);
    }

}

export default Index;