
import props from '../props.js';

function Index(activeTool){
	props.activeTool = activeTool; 
	KIA.observer.ui.observe('changeActiveTool');
}

export default Index;