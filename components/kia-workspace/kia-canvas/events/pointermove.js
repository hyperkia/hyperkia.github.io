
import props from '../utils/props.js';
 
class Index {

    static baseTolerance = 2; 

    static handler(e){

        props.mX = e.clientX;
        props.mY = e.clientY;

        if(e.buttons != 1) return
            
        if(!props.isActualMove) {
            const tolerance = Math.min(Math.max(this.baseTolerance / KIA.state.ui.canvasZoom, 2), 5);        
            const moveValue = Math.sqrt((props.mX - props.dX) ** 2 + (props.mY - props.dY) ** 2);                    
            if(tolerance > moveValue) {
                return;
            } else {
                props.isActualMove = true;
            }
        }        

        props.root.tools[props.pointerDownTool].handlePointerMove(e);
        KIA.dom.kiaCanvas.createSelectionLayersOutline();
    }

    
}

export default Index;