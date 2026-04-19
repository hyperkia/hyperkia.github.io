
import props from '../utils/props.js';
 
class Index {

    static handler(e){

        props.uX = e.clientX;
        props.uY = e.clientY;
        
        if(e.button === 2) return;

        let tool = KIA.state.ui.getProp('activeTool');
        props.root.tools[tool].handlePointerUp(e);

        props.isActualMove = false;
        props.activePage = null;
    }

    
}

export default Index;