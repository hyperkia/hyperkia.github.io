
import props from '../utils/props.js';
 
class Index {

    static handler(e){
        props.uX = e.clientX;
        props.uY = e.clientY;

        if (e.button !== 0) return;
                
        props.root.tools[props.pointerDownTool].handlePointerUp(e); 

        props.isActualMove = false;        
        if(!KIA.kiaCanvas.$id.resizeController.style.length) KIA.dom.kiaCanvas.selectionLayerResizeController();
    }

}

export default Index;