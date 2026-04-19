
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {
	static handlePointerDown(e) {
		props.root.setPointerCapture(e.pointerId);
		this.startX = e.clientX - KIA.state.ui.getProp('pagesX');
		this.startY = e.clientY - KIA.state.ui.getProp('pagesY');
		this.panning = true;
		KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'downHandTool'});
	}

	static handlePointerMove(e) {
        if (!props.root.hasPointerCapture(e.pointerId)) return false;
        if (!this.panning) return;
        this.pagesX = +(e.clientX - this.startX).toFixed(0);
        this.pagesY = +(e.clientY - this.startY).toFixed(0);
        KIA.actions.kiaCanvas.moveCanvas({pagesX: this.pagesX, pagesY: this.pagesY});
    }

    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'upHandTool'});
    }
}

export default Index;