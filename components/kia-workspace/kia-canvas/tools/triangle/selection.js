
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
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downTriangleSelection'});
        props.root.$id.canvasSelection.style = '';
    },

    pointermove(e) {

        this.cssmXY = KIA.dom.read.getCanvasScrollCoords({e});
        
        const cssObj = {
            left: Math.min(this.cssdXY.x, this.cssmXY.x),
            top: Math.min(this.cssdXY.y, this.cssmXY.y),
            width: Math.abs(this.cssmXY.x - this.cssdXY.x),
            height: Math.abs(this.cssmXY.y - this.cssdXY.y),
        }
        props.root.$id.canvasSelection.style = `left: ${cssObj.left}px;top: ${cssObj.top}px;width: ${cssObj.width}px;height:${cssObj.height}px;`;

        // const selectedEls = KIA.dom.kiaCanvas.getElementsInMultiSelectionArea();
        // KIA.actions.share.setSelectionIds(selectedEls);
    },

    pointerup() {
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upTriangleSelection'});
        if (!props.isActualMove) return;
        const style = props.root.$id.canvasSelection.getAttribute('style');
        props.root.$id.canvasSelection.style = '';
        // const selectedEls = KIA.dom.kiaCanvas.getElementsInMultiSelectionArea();
        // KIA.actions.share.setSelectionIds(selectedEls);
        // KIA.dom.kiaCanvas.drawMultiElementsSelectionBound();
    },

    pointercancel(){
        props.root.$id.canvasSelection.style = '';
    },
}

export default Index;