
import props from '../utils/props.js';
 
class Index {

    static handler(e){

        if (e.button !== 0) return;

        let tool = KIA.state.ui.getProp('activeTool');
        props.root.tools[tool].handlePointerCancel(e); 

        props.isActualMove = false;
    }

    
}

export default Index;