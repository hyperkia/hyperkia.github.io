
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	props.map[id].nodeName = newLayerObj.nodeName;
	KIA.observer.layers.observe('setNodeName');
}

export default Index;