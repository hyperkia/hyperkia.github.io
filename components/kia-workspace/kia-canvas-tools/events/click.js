  
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if (props.eTarget.closest('[data-tool]')) this.changeCanvasActiveTool();
	}

	static changeCanvasActiveTool(){
		let activeToolEl = props.eTarget.closest('[data-tool]');		
		KIA.actions.kiaCanvasTools.changeActiveTool(activeToolEl.dataset.tool);
	}

}

export default Index;