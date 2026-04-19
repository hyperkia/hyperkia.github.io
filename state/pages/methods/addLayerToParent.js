
import props from '../props.js';

function Index(layerObj){
	props.map[layerObj.parent].children.push(layerObj.id);
	KIA.observer.pages.observe('addLayerToParent');		
}

export default Index;