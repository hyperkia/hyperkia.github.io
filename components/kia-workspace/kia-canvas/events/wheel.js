
import props from '../utils/props.js';
 
class Index {

    static debounceTimeout = null;

    static handler(e){
        if (KIA.state.ui.getProp('activeTool') === 'zoom' || e.ctrlKey) {
            props.root.$id.pages.classList.add('canvas-zooming');
            KIA.actions.kiaCanvas.changeCanvasZoom(e);

            if (e.deltaY < 0) {
                KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'canvasZoomIn'});
            } else if (e.deltaY > 0) {
                KIA.dom.kiaCanvas.setCanvasCurrentAction({action: 'canvasZoomOut'});
            }

            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                props.root.$id.pages.classList.remove('canvas-zooming');                
                KIA.dom.kiaCanvas.createSelectionLayersOutline();                
            }, 120);
        }
    }

    
}

export default Index;